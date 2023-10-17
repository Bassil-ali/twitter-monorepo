import { dataSource } from '@/main'
import { Injectable } from '@nestjs/common'
import {
    registerDecorator,
    validate,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator'
import { BaseEntity, EntitySchema, EntityTarget } from 'typeorm'

export function IsExists(entity: any, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [entity],
            validator: IsExistsConstraint,
        })
    }
}

@Injectable()
@ValidatorConstraint({ name: 'IsExists' })
export class IsExistsConstraint implements ValidatorConstraintInterface {
    async validate(value: any, args: ValidationArguments) {
        const [entity] = args.constraints
        const repository = dataSource.getRepository(entity)
        const isExists = await repository.findOne({
            where: {
                [args.property]: value,
            },
        })
        return !!isExists
    }

    defaultMessage(): string {
        return 'Tweet Not Found'
    }
}

import { Injectable } from '@nestjs/common'
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator'
import { dataSource } from 'src/main'
import { User } from 'src/users/entities/user.entity'

interface Arguments extends ValidationArguments {
    except: number
}

@Injectable()
@ValidatorConstraint({ name: 'isAlreadyRegister', async: true  })
export class IsAlreadyRegisterConstraint
    implements ValidatorConstraintInterface {
    constructor() { }

    async validate(value: string, a: Arguments) {
        const users = dataSource.getRepository(User)

        const userExist = await users.findOne({
            where: {
                [a.property]: value,
            },
        })

        return !userExist

    }

    defaultMessage(): string {
        return '$property is already registered'
    }
}

interface Options {
    exceptCurrent?:boolean
}

export function IsAlreadyRegister(exceptCurrent:Options = {}  , options: ValidationOptions  = {}) {
    return function (object: object, propertyName: 'username' | 'email') {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options,
            constraints: [exceptCurrent],
            validator: IsAlreadyRegisterConstraint,
        })
    }
}

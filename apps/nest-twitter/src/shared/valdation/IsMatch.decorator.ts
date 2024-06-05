import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

// Custom validation decorator factory function
export function Match(property: string, validationOptions?: ValidationOptions) {
    return (target: any, propertyName: string) => {
        registerDecorator({
            target: target.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: MatchConstraint,
        });
    };
}

// Validator constraint implementing the validation logic
@Injectable()
@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {

    validate(value: any, args: ValidationArguments): boolean {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = args.object[relatedPropertyName];
        return value === relatedValue;
    }

    defaultMessage(): string {
        return 'Passwords do not match';
    }
}

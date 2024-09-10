import { MaxLength } from "class-validator";
import { User } from "./user.aggregate";
import { ClassValidatorFields } from "src/core/shared/domain/validators/class-validator-fields";
import { Notification } from "src/core/shared/domain/validators/notification";

export class UserRules {
  @MaxLength(255, { groups: ["name"] })
  name: string;

  @MaxLength(255, { groups: ["email"] })
  email: string;

  @MaxLength(255, { groups: ["password"] })
  password: string;

  constructor(props: User) {
    Object.assign(this, props);
  }
}

export class UserValidator extends ClassValidatorFields {
  validate(notification: Notification, data: User, fields?: string[]): boolean {
    const newFields = fields?.length ? fields : ["name", "email", "password"];
    return super.validate(notification, new UserRules(data), newFields);
  }
}

export class UserValidatorFactory {
  static create() {
    return new UserValidator();
  }
}

export default UserValidatorFactory;

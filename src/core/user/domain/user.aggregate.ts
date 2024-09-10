import UserValidatorFactory from "./user.validator";
import { UserFakeBuilder } from "./user-fake.builder";
import { AggregateRoot } from "../../shared/domain/aggregate-root";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";

export type UserConstructorProps = {
  user_id?: UserId;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
};

export type UserCreateCommand = {
  name: string;
  email: string;
  password: string;
};

export class UserId extends Uuid {}

export class User extends AggregateRoot {
  user_id: UserId;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;

  constructor(props: UserConstructorProps) {
    super();
    this.user_id = props.user_id ?? new UserId();
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.created_at = props.created_at || new Date();
    this.updated_at = props.updated_at || new Date();
    this.deleted_at = props.deleted_at || null;
  }

  static create(props: UserCreateCommand) {
    const user = new User(props);
    user.validate(["name", "email", "password"]);
    return user;
  }

  changeName(name: string) {
    this.name = name;
    this.validate(["name"]);
  }

  changeEmail(email: string) {
    this.email = email;
    this.validate(["email"]);
  }

  changePassword(password: string) {
    this.password = password;
    this.validate(["password"]);
  }

  validate(fields?: string[]) {
    const validator = UserValidatorFactory.create();
    return validator.validate(this.notification, this, fields);
  }

  get entity_id() {
    return this.user_id;
  }

  static fake() {
    return UserFakeBuilder;
  }

  toJSON() {
    return {
      user_id: this.user_id.id,
      name: this.name,
      email: this.email,
      password: this.password,
      created_at: this.created_at,
      updated_at: this.updated_at,
      deleted_at: this.deleted_at,
    };
  }
}

import { Chance } from "chance";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { User } from "./user.aggregate";

type PropOrFactory<T> = T | ((index: number) => T);

export class UserFakeBuilder<TBuild = any> {
  // auto generated in entity
  private _user_id: PropOrFactory<Uuid> | undefined = undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _name: PropOrFactory<string> = (_index) => this.chance.word();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _email: PropOrFactory<string> = (_index) => this.chance.email();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _password: PropOrFactory<string> = (_index) => this.chance.hash();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _updated_at: PropOrFactory<Date> | undefined = undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _deleted_at: PropOrFactory<Date> | undefined = undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // auto generated in entity
  private _created_at: PropOrFactory<Date> | undefined = undefined;

  private countObjs;

  static aUser() {
    return new UserFakeBuilder<User>();
  }

  static theUsers(countObjs: number) {
    return new UserFakeBuilder<User[]>(countObjs);
  }

  private chance: Chance.Chance;

  private constructor(countObjs: number = 1) {
    this.countObjs = countObjs;
    this.chance = Chance();
  }

  withUserId(valueOrFactory: PropOrFactory<Uuid>) {
    this._user_id = valueOrFactory;
    return this;
  }

  withName(valueOrFactory: PropOrFactory<string>) {
    this._name = valueOrFactory;
    return this;
  }

  withEmail(valueOrFactory: PropOrFactory<string>) {
    this._email = valueOrFactory;
    return this;
  }

  withPassword(valueOrFactory: PropOrFactory<string>) {
    this._password = valueOrFactory;
    return this;
  }

  withCreatedAt(valueOrFactory: PropOrFactory<Date>) {
    this._created_at = valueOrFactory;
    return this;
  }

  withUpdatedAt(valueOrFactory: PropOrFactory<Date>) {
    this._updated_at = valueOrFactory;
    return this;
  }

  withDeletedAt(valueOrFactory: PropOrFactory<Date>) {
    this._deleted_at = valueOrFactory;
    return this;
  }

  withInvalidNameTooLong(value?: string) {
    this._name = value ?? this.chance.word({ length: 256 });
    return this;
  }

  build(): TBuild {
    const users = new Array(this.countObjs).fill(undefined).map((_, index) => {
      const user = new User({
        user_id: !this._user_id
          ? undefined
          : this.callFactory(this._user_id, index),
        name: this.callFactory(this._name, index),
        email: this.callFactory(this._email, index),
        password: this.callFactory(this._password, index),
        updated_at: this.callFactory(this._updated_at, index),
        deleted_at: this.callFactory(this._deleted_at, index),
        ...(this._created_at && {
          created_at: this.callFactory(this._created_at, index),
        }),
      });
      //user.validate();
      return user;
    });
    return this.countObjs === 1 ? (users[0] as any) : users;
  }

  get user_id() {
    return this.getValue("user_id");
  }

  get name() {
    return this.getValue("name");
  }

  get email() {
    return this.getValue("email");
  }

  get password() {
    return this.getValue("password");
  }

  get created_at() {
    return this.getValue("created_at");
  }

  get updated_at() {
    return this.getValue("updated_at");
  }

  get deleted_at() {
    return this.getValue("deleted_at");
  }

  private getValue(prop: any) {
    const optional = ["user_id", "created_at"];
    const privateProp = `_${prop}` as keyof this;
    if (!this[privateProp] && optional.includes(prop)) {
      throw new Error(
        `Property ${prop} not have a factory, use 'with' methods`
      );
    }
    return this.callFactory(this[privateProp], 0);
  }

  private callFactory(factoryOrValue: PropOrFactory<any>, index: number) {
    return typeof factoryOrValue === "function"
      ? factoryOrValue(index)
      : factoryOrValue;
  }
}

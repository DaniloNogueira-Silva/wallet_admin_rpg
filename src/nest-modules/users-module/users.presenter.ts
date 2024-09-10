import { Transform } from "class-transformer";
import { CollectionPresenter } from "../shared-module/collection.presenter";
import { UserOutput } from "src/core/user/application/common/user-output";
import { ListUserOutput } from "src/core/user/application/list-user/list-user.use-case";

export class UserPresenter {
  id: string;
  name: string;
  email: string;
  password: string;
  @Transform(({ value }: { value: Date }) => value.toISOString())
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;

  constructor(output: UserOutput) {
    this.id = output.id;
    this.name = output.name;
    this.email = output.email;
    this.password = output.password;
    this.created_at = output.created_at;
    this.updated_at = output.updated_at;
    this.deleted_at = output.deleted_at;
  }
}

export class UserCollectionPresenter extends CollectionPresenter {
  data: UserPresenter[];

  constructor(output: ListUserOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((i) => new UserPresenter(i));
  }
}

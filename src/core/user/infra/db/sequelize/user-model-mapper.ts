import { LoadEntityError } from "src/core/shared/domain/validators/validator.error";
import { User, UserId } from "../../../domain/user.aggregate";
import { UserModel } from "./user.model";

export class UserModelMapper {
  static toModel(entity: User): UserModel {
    return UserModel.build({
      user_id: entity.user_id.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
      deleted_at: entity.deleted_at,
    });
  }

  static toEntity(model: UserModel): User {
    const user = new User({
      user_id: new UserId(model.user_id),
      name: model.name,
      email: model.email,
      password: model.password,
      created_at: model.created_at,
      updated_at: model.updated_at,
      deleted_at: model.deleted_at,
    });

    user.validate();
    if (user.notification.hasErrors()) {
      throw new LoadEntityError(user.notification.toJSON());
    }
    return user;
  }
}

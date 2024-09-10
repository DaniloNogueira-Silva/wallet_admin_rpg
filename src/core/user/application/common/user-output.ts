import { User } from "src/core/user/domain/user.aggregate";

export type UserOutput = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

export class UserOutputMapper {
  static toOutput(entity: User): UserOutput {
    const { user_id, ...otherProps } = entity.toJSON();
    return {
      id: user_id,
      ...otherProps,
    };
  }
}

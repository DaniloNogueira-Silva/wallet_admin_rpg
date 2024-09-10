import { IUseCase } from "src/core/shared/application/use-case.interface";
import { UpdateUserInput } from "./update-user.input";
import { IUserRepository } from "src/core/user/domain/user.repository";
import { User, UserId } from "src/core/user/domain/user.aggregate";
import { NotFoundError } from "src/core/shared/domain/errors/not-found.error";
import { EntityValidationError } from "src/core/shared/domain/validators/validator.error";
import { UserOutput, UserOutputMapper } from "../common/user-output";

export class UpdateUserUseCase
  implements IUseCase<UpdateUserInput, UpdateUserOutput>
{
  constructor(private userRepo: IUserRepository) {}

  async execute(input: UpdateUserInput): Promise<UpdateUserOutput> {
    const userId = new UserId(input.id);
    const user = await this.userRepo.findById(userId);

    if (!user) {
      throw new NotFoundError(input.id, User);
    }

    input.name && user.changeName(input.name);

    if (input.email !== undefined) {
      user.changeEmail(input.email);
    }

    if (input.password !== undefined) {
      user.changePassword(input.password);
    }

    if (user.notification.hasErrors()) {
      throw new EntityValidationError(user.notification.toJSON());
    }

    await this.userRepo.update(user);

    return UserOutputMapper.toOutput(user);
  }
}

export type UpdateUserOutput = UserOutput;

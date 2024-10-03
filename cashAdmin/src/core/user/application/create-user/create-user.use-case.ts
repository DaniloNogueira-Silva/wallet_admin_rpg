import { EntityValidationError } from "../../../shared/domain/validators/validator.error";
import { IUseCase } from "../../../shared/application/use-case.interface";
import { UserOutput, UserOutputMapper } from "../common/user-output";
import { CreateUserInput } from "./create-user.input";
import { IUserRepository } from "../../domain/user.repository";
import { User } from "../../domain/user.aggregate";

export class CreateUserUseCase
  implements IUseCase<CreateUserInput, CreateUserOutput>
{
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const entity = User.create(input);

    if (entity.notification.hasErrors()) {
      throw new EntityValidationError(entity.notification.toJSON());
    }

    await this.userRepo.insert(entity);

    return UserOutputMapper.toOutput(entity);
  }
}

export type CreateUserOutput = UserOutput;

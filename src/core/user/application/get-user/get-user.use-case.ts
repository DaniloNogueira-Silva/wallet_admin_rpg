import { IUseCase } from "@core/shared/application/use-case.interface";
import { UserOutput, UserOutputMapper } from "../common/user-output";
import { IUserRepository } from "@core/user/domain/user.repository";
import { User, UserId } from "@core/user/domain/user.aggregate";
import { NotFoundError } from "@core/shared/domain/errors/not-found.error";

export class GetUserUseCase implements IUseCase<GetUserInput, GetUserOutput> {
  constructor(private userRepo: IUserRepository) {}

  async execute(input: GetUserInput): Promise<GetUserOutput> {
    const userId = new UserId(input.id);
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new NotFoundError(input.id, User);
    }

    return UserOutputMapper.toOutput(user);
  }
}

export type GetUserInput = {
  id: string;
};

export type GetUserOutput = UserOutput;

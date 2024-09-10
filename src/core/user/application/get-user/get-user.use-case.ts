import { IUseCase } from "../../../shared/application/use-case.interface";
import { UserOutput, UserOutputMapper } from "../common/user-output";
import { IUserRepository } from "../../../user/domain/user.repository";
import { User, UserId } from "../../../user/domain/user.aggregate";
import { NotFoundError } from "../../../shared/domain/errors/not-found.error";

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

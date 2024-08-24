import { IUseCase } from "@core/shared/application/use-case.interface";
import { UserId } from "@core/user/domain/user.aggregate";
import { IUserRepository } from "@core/user/domain/user.repository";

export class DeleteUserUseCase
  implements IUseCase<DeleteUserInput, DeleteUserOutput>
{
  constructor(private userRepo: IUserRepository) {}

  async execute(input: DeleteUserInput): Promise<DeleteUserOutput> {
    const userId = new UserId(input.id);
    await this.userRepo.delete(userId);
  }
}

export type DeleteUserInput = {
  id: string;
};

type DeleteUserOutput = void;

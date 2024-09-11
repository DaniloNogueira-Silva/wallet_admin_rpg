import { IUnitOfWork } from "../../../../shared/domain/unit-of-work.interface";
import { IUseCase } from "../../../../shared/application/use-case.interface";
import { GoalId } from "../../../domain/goal.aggregate";
import { IGoalRepository } from "../../../domain/goal.repository";

export class DeleteGoalUseCase
  implements IUseCase<DeleteGoalInput, DeleteGoalOutput>
{
  constructor(
    private uow: IUnitOfWork,
    private goalRepo: IGoalRepository
  ) {}

  async execute(input: DeleteGoalInput): Promise<DeleteGoalOutput> {
    const goalId = new GoalId(input.id);
    return this.uow.do(async () => {
      return this.goalRepo.delete(goalId);
    });
  }
}

export type DeleteGoalInput = {
  id: string;
};

type DeleteGoalOutput = void;

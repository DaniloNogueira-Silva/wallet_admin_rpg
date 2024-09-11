import { IGoalRepository } from "src/core/goal/domain/goal.repository";
import { IUseCase } from "../../../../shared/application/use-case.interface";
import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";
import { Goal, GoalId } from "../../../domain/goal.aggregate";
import { GoalOutput, GoalOutputMapper } from "../common/goal-output";

export class GetGoalUseCase implements IUseCase<GetGoalInput, GetGoalOutput> {
  constructor(private goalRepo: IGoalRepository) {}

  async execute(input: GetGoalInput): Promise<GetGoalOutput> {
    const goalId = new GoalId(input.id);
    const goal = await this.goalRepo.findById(goalId);
    if (!goal) {
      throw new NotFoundError(input.id, Goal);
    }
    return GoalOutputMapper.toOutput(goal);
  }
}

export type GetGoalInput = {
  id: string;
};

export type GetGoalOutput = GoalOutput;

import { Either } from '../../../shared/domain/either';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';
import { Goal, GoalId } from '../../domain/goal.aggregate';
import { IGoalRepository } from '../../domain/goal.repository';

export class GoalIdExistsInDatabaseValidator {
  constructor(private goalRepo: IGoalRepository) {}

  async validate(
    goal_id: string[],
  ): Promise<Either<GoalId[], NotFoundError[]>> {
    const goalId = goal_id.map((v) => new GoalId(v));

    const existsResult = await this.goalRepo.existsById(goalId);
    return existsResult.not_exists.length > 0
      ? Either.fail(
          existsResult.not_exists.map((c) => new NotFoundError(c.id, Goal)),
        )
      : Either.ok(goalId);
  }
}

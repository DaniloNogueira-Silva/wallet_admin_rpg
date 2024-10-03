import { IUnitOfWork } from 'src/core/shared/domain/unit-of-work.interface';
import { CategoriesIdExistsInDatabaseValidator } from '../../../../category/application/validations/categories-ids-exists-in-database.validator';
import { ICategoryRepository } from '../../../../category/domain/category.repository';
import { IUseCase } from '../../../../shared/application/use-case.interface';
import { NotFoundError } from '../../../../shared/domain/errors/not-found.error';
import { Goal, GoalId } from '../../../domain/goal.aggregate';
import { IGoalRepository } from '../../../domain/goal.repository';
import { UpdateGoalInput } from './update-goal.input';
import { EntityValidationError } from 'src/core/shared/domain/validators/validator.error';
import { GoalOutput, GoalOutputMapper } from '../common/goal-output';

export class UpdateGoalUseCase
  implements IUseCase<UpdateGoalInput, UpdateGoalOutput>
{
  constructor(
    private uow: IUnitOfWork,
    private goalRepo: IGoalRepository,
  ) {}

  async execute(input: UpdateGoalInput): Promise<UpdateGoalOutput> {
    const goalId = new GoalId(input.id);
    const goal = await this.goalRepo.findById(goalId);

    if (!goal) {
      throw new NotFoundError(input.id, Goal);
    }

    input.name && goal.changeName(input.name);

    input.description && goal.changeDescription(input.description);

    input.balance && goal.changeBalance(input.balance);

    input.end_date && goal.changeEndDate(input.end_date);

    if (goal.notification.hasErrors()) {
      throw new EntityValidationError(goal.notification.toJSON());
    }

    await this.uow.do(async () => {
      return this.goalRepo.update(goal);
    });


    return GoalOutputMapper.toOutput(goal);
  }
}

export type UpdateGoalOutput = GoalOutput;

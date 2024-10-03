import { EntityValidationError } from '../../../../shared/domain/validators/validator.error';
import { IUseCase } from '../../../../shared/application/use-case.interface';
import { Goal } from '../../../domain/goal.aggregate';
import { IGoalRepository } from '../../../domain/goal.repository';
import { CreateGoalInput } from './goal-genre.input';
import { GoalOutput, GoalOutputMapper } from '../common/goal-output';

export class CreateGoalUseCase
  implements IUseCase<CreateGoalInput, CreateGoalOutput>
{
  constructor(private readonly goalRepo: IGoalRepository) {}

  async execute(input: CreateGoalInput): Promise<CreateGoalOutput> {
    const entity = Goal.create(input);

    if (entity.notification.hasErrors()) {
      throw new EntityValidationError(entity.notification.toJSON());
    }

    await this.goalRepo.insert(entity);

    return GoalOutputMapper.toOutput(entity);
  }
}

export type CreateGoalOutput = GoalOutput;

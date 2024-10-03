import { MaxLength } from 'class-validator';
import { ClassValidatorFields } from '../../shared/domain/validators/class-validator-fields';
import { Goal } from './goal.aggregate';
import { Notification } from '../../shared/domain/validators/notification';

export class GoalRules {
  @MaxLength(255, { groups: ['name'] })
  name: string;

  constructor(entity: Goal) {
    Object.assign(this, entity);
  }
}

export class GoalValidator extends ClassValidatorFields {
  validate(
    notification: Notification,
    data: Goal,
    fields?: string[],
  ): boolean {
    const newFields = fields?.length ? fields : ['name'];
    return super.validate(notification, new GoalRules(data), newFields);
  }
}

export class GoalValidatorFactory {
  static create() {
    return new GoalValidator();
  }
}

export default GoalValidatorFactory;

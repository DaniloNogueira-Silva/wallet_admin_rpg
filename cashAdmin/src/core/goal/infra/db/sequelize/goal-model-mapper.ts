import { Goal, GoalId } from "../../../domain/goal.aggregate";
import { LoadEntityError } from "../../../../shared/domain/validators/validator.error";
import { GoalModel } from "./goal-model";

export class GoalModelMapper {
  static toModel(entity: Goal): GoalModel {
    return GoalModel.build({
      goal_id: entity.goal_id.id,
      name: entity.name,
      description: entity.description ?? undefined,
      balance: entity.balance,
      end_date: entity.end_date,
    });
  }

  static toEntity(model: GoalModel): Goal {
    const goal = new Goal({
      goal_id: new GoalId(model.goal_id),
      name: model.name,
      description: model.description,
      balance: model.balance,
      end_date: model.end_date,
    });

    goal.validate();
    if (goal.notification.hasErrors()) {
      throw new LoadEntityError(goal.notification.toJSON());
    }
    return goal;
  }
}

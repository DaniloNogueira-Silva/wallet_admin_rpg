import { Goal } from "../../../domain/goal.aggregate";

export type GoalOutput = {
  id: string;
  name: string;
  description: string | null;
  balance: number;
  end_date: Date;
};

export class GoalOutputMapper {
  static toOutput(entity: Goal): GoalOutput {
    return {
      id: entity.goal_id.id,
      name: entity.name,
      description: entity.description,
      balance: entity.balance,
      end_date: entity.end_date,
    };
  }
}

import { AggregateRoot } from "../../shared/domain/aggregate-root";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { GoalFakeBuilder } from "./goal-fake.builder";
import GoalValidatorFactory from "./goal.validator";

export type GoalConstructorProps = {
  goal_id?: GoalId;
  name: string;
  description?: string | null;
  balance: number;
  end_date?: Date | null;
};

export type GoalCreateCommand = {
  name: string;
  description?: string | null;
  balance: number;
  end_date?: Date | null;
};

export class GoalId extends Uuid {}

export class Goal extends AggregateRoot {
  goal_id: GoalId;
  name: string;
  description: string | null;
  balance: number;
  end_date: Date;

  constructor(props: GoalConstructorProps) {
    super();
    this.goal_id = props.goal_id ?? new GoalId();
    this.name = props.name;
    this.description = props.description ?? null;
    this.balance = props.balance ?? 0;
    this.end_date = props.end_date ?? new Date();
  }

  static create(props: GoalCreateCommand) {
    const goal = new Goal(props);
    return goal;
  }

  changeName(name: string) {
    this.name = name;
  }

  changeDescription(description: string) {
    this.description = description;
  }

  changeBalance(balance: number) {
    this.balance = balance;
  }

  changeEndDate(end_date: Date) {
    this.end_date = end_date;
  }

  get entity_id() {
    return this.goal_id;
  }

  validate(fields?: string[]) {
    const validator = GoalValidatorFactory.create();
    return validator.validate(this.notification, this, fields);
  }

  static fake() {
    return GoalFakeBuilder;
  }

  toJSON() {
    return {
      goal_id: this.goal_id.id,
      name: this.name,
      description: this.description,
      balance: this.balance,
      end_date: this.end_date,
    };
  }
}

import { IsNumber } from "class-validator";
import { Chance } from "chance";
import { Goal, GoalId } from "./goal.aggregate";
import { CategoryId } from "../../category/domain/category.aggregate";

type PropOrFactory<T> = T | ((index: number) => T);

export class GoalFakeBuilder<TBuild = any> {
  // auto generated in entity
  private _goal_id: PropOrFactory<GoalId> | undefined = undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _name: PropOrFactory<string> = (_index) => this.chance.word();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _description: PropOrFactory<string> = (_index) => this.chance.word();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _balance: PropOrFactory<number> = (_index) => this.chance.floating();
  // auto generated in entity
  private _end_date: PropOrFactory<Date> | undefined = undefined;

  private countObjs;

  static aGoal() {
    return new GoalFakeBuilder<Goal>();
  }

  static theGoal(countObjs: number) {
    return new GoalFakeBuilder<Goal[]>(countObjs);
  }

  private chance: Chance.Chance;

  private constructor(countObjs: number = 1) {
    this.countObjs = countObjs;
    this.chance = Chance();
  }

  withGoalId(valueOrFactory: PropOrFactory<GoalId>) {
    this._goal_id = valueOrFactory;
    return this;
  }

  withName(valueOrFactory: PropOrFactory<string>) {
    this._name = valueOrFactory;
    return this;
  }

  withDescription(valueOrFactory: PropOrFactory<string>) {
    this._description = valueOrFactory;
    return this;
  }

  withBalance(valueOrFactory: PropOrFactory<number>) {
    this._balance = valueOrFactory;
    return this;
  }

  withEndDate(valueOrFactory: PropOrFactory<Date>) {
    this._end_date = valueOrFactory;
    return this;
  }

  build(): TBuild {
    const categories = new Array(this.countObjs)
      .fill(undefined)
      .map((_, index) => {
        const category = new Goal({
          category_id: !this._goal_id
            ? undefined
            : this.callFactory(this._goal_id, index),
          name: this.callFactory(this._name, index),
          ...(this.end_date && {
            created_at: this.callFactory(this.end_date, index),
          }),
        });
        category.validate();
        return category;
      });
    return this.countObjs === 1 ? (categories[0] as any) : categories;
  }

  get goal_id() {
    return this.getValue("goal_id");
  }

  get name() {
    return this.getValue("name");
  }

  get description() {
    return this.getValue("description");
  }

  get balance() {
    return this.getValue("balance");
  }

  get end_date() {
    return this.getValue("end_date");
  }

  private getValue(prop: any) {
    const optional = ["goal_id", "end_date"];
    const privateProp = `_${prop}` as keyof this;
    if (!this[privateProp] && optional.includes(prop)) {
      throw new Error(
        `Property ${prop} not have a factory, use 'with' methods`
      );
    }
    return this.callFactory(this[privateProp], 0);
  }

  private callFactory(factoryOrValue: PropOrFactory<any>, index: number) {
    if (typeof factoryOrValue === "function") {
      return factoryOrValue(index);
    }

    if (factoryOrValue instanceof Array) {
      return factoryOrValue.map((value) => this.callFactory(value, index));
    }

    return factoryOrValue;
  }
}

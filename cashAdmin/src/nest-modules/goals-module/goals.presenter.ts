import { Transform } from "class-transformer";
import { GoalOutput } from "../../core/goal/application/use-cases/common/goal-output";
import { CollectionPresenter } from "../shared-module/collection.presenter";
import { ListGoalsOutput } from "src/core/goal/application/use-cases/list-goal/list-goals.use-case";

export class GoalPresenter {
  id: string;
  name: string;
  @Transform(({ value }: { value: Date }) => value.toISOString())
  end_date: Date;

  constructor(output: GoalOutput) {
    this.id = output.id;
    this.name = output.name;
    this.end_date = output.end_date;
  }
}

export class GoalCollectionPresenter extends CollectionPresenter {
  data: GoalPresenter[];

  constructor(output: ListGoalsOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((i) => new GoalPresenter(i));
  }
}

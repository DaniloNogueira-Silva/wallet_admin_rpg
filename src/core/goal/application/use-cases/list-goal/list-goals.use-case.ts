import {
  PaginationOutput,
  PaginationOutputMapper,
} from "../../../../shared/application/pagination-output";
import { IUseCase } from "../../../../shared/application/use-case.interface";
import { SortDirection } from "../../../../shared/domain/repository/search-params";
import {
  GoalFilter,
  GoalSearchParams,
  GoalSearchResult,
  IGoalRepository,
} from "../../../domain/goal.repository";
import { GoalOutput, GoalOutputMapper } from "../common/goal-output";

export class ListGoalsUseCase
  implements IUseCase<ListGoalsInput, ListGoalsOutput>
{
  constructor(private goalRepo: IGoalRepository) {}

  async execute(input: ListGoalsInput): Promise<ListGoalsOutput> {
    const params = new GoalSearchParams(input);
    const searchResult = await this.goalRepo.search(params);
    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: GoalSearchResult): ListGoalsOutput {
    const { items: _items } = searchResult;
    const items = _items.map((i) => {
      return GoalOutputMapper.toOutput(i);
    });
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}

export type ListGoalsInput = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: GoalFilter | null;
};

export type ListGoalsOutput = PaginationOutput<GoalOutput>;

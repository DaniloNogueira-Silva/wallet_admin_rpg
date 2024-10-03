import { ISearchableRepository } from "../../shared/domain/repository/repository-interface";
import {
  SearchParams,
} from "../../shared/domain/repository/search-params";
import { SearchResult } from "../../shared/domain/repository/search-result";
import { Goal, GoalId } from "./goal.aggregate";

export type GoalFilter = string;

export class GoalSearchParams extends SearchParams<GoalFilter> {}

export class GoalSearchResult extends SearchResult<Goal> {}

export interface IGoalRepository
  extends ISearchableRepository<
    Goal,
    GoalId,
    GoalFilter,
    GoalSearchParams,
    GoalSearchResult
  > {}

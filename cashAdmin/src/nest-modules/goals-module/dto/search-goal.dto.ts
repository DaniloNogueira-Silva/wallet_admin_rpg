import { SortDirection } from '../../../core/shared/domain/repository/search-params';
import { ListGoalsInput } from 'src/core/goal/application/use-cases/list-goal/list-goals.use-case';

export class SearchGoalsDto implements ListGoalsInput {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: any;
}

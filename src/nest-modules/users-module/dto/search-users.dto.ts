import { ListUserInput } from '@core/user/application/list-user/list-user.use-case';
import { SortDirection } from '../../../core/shared/domain/repository/search-params';

export class SearchUsersDto implements ListUserInput {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: string;
}

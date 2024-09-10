import { SortDirection } from '../../../core/shared/domain/repository/search-params';
import { ListUserInput } from 'src/core/user/application/list-user/list-user.use-case';

export class SearchUsersDto implements ListUserInput {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: string;
}

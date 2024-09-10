import { IUseCase } from "src/core/shared/application/use-case.interface";
import {
  IUserRepository,
  UserFilter,
  UserSearchParams,
  UserSearchResult,
} from "src/core/user/domain/user.repository";
import { UserOutput, UserOutputMapper } from "../common/user-output";
import { SortDirection } from "src/core/shared/domain/repository/search-params";
import {
  PaginationOutput,
  PaginationOutputMapper,
} from "src/core/shared/application/pagination-output";

export class ListUserUseCase
  implements IUseCase<ListUserInput, ListUserOutput>
{
  constructor(private userRepo: IUserRepository) {}

  async execute(input: ListUserInput): Promise<ListUserOutput> {
    const params = new UserSearchParams(input);
    const searchResult = await this.userRepo.search(params);
    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: UserSearchResult): ListUserOutput {
    const { items: _items } = searchResult;
    const items = _items.map((i) => {
      return UserOutputMapper.toOutput(i);
    });
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}

export type ListUserInput = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: UserFilter | null;
};

export type ListUserOutput = PaginationOutput<UserOutput>;

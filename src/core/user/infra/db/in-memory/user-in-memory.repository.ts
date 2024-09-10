import { SortDirection } from "src/core/shared/domain/repository/search-params";
import { Uuid } from "src/core/shared/domain/value-objects/uuid.vo";
import {
  InMemoryRepository,
  InMemorySearchableRepository,
} from "src/core/shared/infra/db/in-memory/in-memory-repository";
import { User } from "src/core/user/domain/user.aggregate";
import { IUserRepository } from "src/core/user/domain/user.repository";

export class UserInMemoryRepository
  extends InMemorySearchableRepository<User, Uuid>
  implements IUserRepository
{
  sortableFields: string[] = ["name", "created_at"];

  protected async applyFilter(
    items: User[],
    filter: string | null
  ): Promise<User[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  getEntity(): new (...args: User[]) => User {
    return User;
  }

  protected applySort(
    items: User[],
    sort: string | null,
    sort_dir: SortDirection | null
  ) {
    return sort
      ? super.applySort(items, sort, sort_dir)
      : super.applySort(items, "created_at", "desc");
  }
}

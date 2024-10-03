import { SortDirection } from "../../../../shared/domain/repository/search-params";
import { Uuid } from "../../../../shared/domain/value-objects/uuid.vo";
import {
  InMemoryRepository,
  InMemorySearchableRepository,
} from "../../../../shared/infra/db/in-memory/in-memory-repository";
import { User } from "../../../domain/user.aggregate";
import { IUserRepository } from "../../../domain/user.repository";

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

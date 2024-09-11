import { SortDirection } from "../../../../shared/domain/repository/search-params";
import { Uuid } from "../../../../shared/domain/value-objects/uuid.vo";
import { InMemorySearchableRepository } from "../../../../shared/infra/db/in-memory/in-memory-repository";
import { Goal } from "../../../../goal/domain/goal.aggregate";
import { IGoalRepository } from "../../../../goal/domain/goal.repository";

export class GoalInMemoryRepository
  extends InMemorySearchableRepository<Goal, Uuid>
  implements IGoalRepository
{
  sortableFields: string[] = ["name"];

  protected async applyFilter(
    items: Goal[],
    filter: string | null
  ): Promise<Goal[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  getEntity(): new (...args: Goal[]) => Goal {
    return Goal;
  }

  protected applySort(
    items: Goal[],
    sort: string | null,
    sort_dir: SortDirection | null
  ) {
    return sort
      ? super.applySort(items, sort, sort_dir)
      : super.applySort(items, "name", "desc");
  }
}

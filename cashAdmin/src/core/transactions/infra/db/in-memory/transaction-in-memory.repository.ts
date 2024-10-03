import { SortDirection } from "../../../../shared/domain/repository/search-params";
import { InMemorySearchableRepository } from "../../../../shared/infra/db/in-memory/in-memory-repository";
import {
  Transaction,
  TransactionId,
} from "../../../domain/transaction.aggregate";
import {
  TransactionFilter,
  ITransactionRepository,
} from "../../../domain/transaction.repository";

export class TransactionInMemoryRepository
  extends InMemorySearchableRepository<Transaction, TransactionId>
  implements ITransactionRepository
{
  sortableFields: string[] = ["value", "created_at"];

  protected async applyFilter(
    items: Transaction[],
    filter: TransactionFilter | null
  ): Promise<Transaction[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.value;
    });
  }
  getEntity(): new (...args: any[]) => Transaction {
    return Transaction;
  }

  protected applySort(
    items: Transaction[],
    sort: string | null,
    sort_dir: SortDirection | null
  ) {
    return sort
      ? super.applySort(items, sort, sort_dir)
      : super.applySort(items, "created_at", "desc");
  }
}

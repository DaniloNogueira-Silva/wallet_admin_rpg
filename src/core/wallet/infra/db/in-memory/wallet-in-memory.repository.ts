import { SortDirection } from "../../../../shared/domain/repository/search-params";
import { InMemorySearchableRepository } from "../../../../shared/infra/db/in-memory/in-memory-repository";
import { Wallet, WalletId } from "../../../domain/wallet.aggregate";
import {
  WalletFilter,
  IWalletRepository,
} from "../../../domain/wallet.repository";

export class WalletInMemoryRepository
  extends InMemorySearchableRepository<Wallet, WalletId>
  implements IWalletRepository
{
  sortableFields: string[] = ["balance", "created_at"];

  protected async applyFilter(
    items: Wallet[],
    filter: WalletFilter | null
  ): Promise<Wallet[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.balance;
    });
  }
  getEntity(): new (...args: any[]) => Wallet {
    return Wallet;
  }

  protected applySort(
    items: Wallet[],
    sort: string | null,
    sort_dir: SortDirection | null
  ) {
    return sort
      ? super.applySort(items, sort, sort_dir)
      : super.applySort(items, "created_at", "desc");
  }
}

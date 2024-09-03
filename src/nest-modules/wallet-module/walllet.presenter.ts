import { CollectionPresenter } from "../shared-module/collection.presenter";
import { WalletOutput } from "@core/wallet/application/use-cases/common/wallet-output";
import { ListWalletsOutput } from "@core/wallet/application/use-cases/list-wallets/list-wallets.use-case";

export class WalletPresenter {
  id: string;
  user_id: string;
  balance: number | null;
  savings: number | null;
  created_at: Date;

  constructor(output: WalletOutput) {
    this.id = output.id;
    this.user_id = output.user_id;
    this.balance = output.balance;
    this.savings = output.savings;
    this.created_at = output.created_at;
  }
}

export class WalletCollectionPresenter extends CollectionPresenter {
  data: WalletPresenter[];

  constructor(output: ListWalletsOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((i) => new WalletPresenter(i));
  }
}

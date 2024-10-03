import { CollectionPresenter } from "../shared-module/collection.presenter";
import { TransactionOutput } from "../../core/transactions/application/use-cases/common/transaction-output";
import { ListTransactionsOutput } from "../../core/transactions/application/use-cases/list-transactions/list-transaction.use-case";

export class TransactionPresenter {
  id: string;
  wallet_id: string;
  category_id: string;
  value: number;
  name: string;
  status: string;
  type: string;
  effective_date: Date;
  created_at: Date;

  constructor(output: TransactionOutput) {
    this.id = output.id;
    this.wallet_id = output.wallet_id;
    this.category_id = output.category_id;
    this.value = output.value;
    this.name = output.name;
    this.status = output.status;
    this.type = output.type;
    this.effective_date = output.effective_date;
    this.created_at = output.created_at;
  }
}

export class TransactionCollectionPresenter extends CollectionPresenter {
  data: TransactionPresenter[];

  constructor(output: ListTransactionsOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((i) => new TransactionPresenter(i));
  }
}

import { ListTransactionsInput } from "src/core/transactions/application/use-cases/list-transactions/list-transaction.use-case";
import { SortDirection } from "../../../core/shared/domain/repository/search-params";

export class SearchTransactionsDto implements ListTransactionsInput {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: string;
}

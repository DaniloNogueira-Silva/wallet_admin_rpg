import {
  PaginationOutput,
  PaginationOutputMapper,
} from '../../../../shared/application/pagination-output';
import { IUseCase } from '../../../../shared/application/use-case.interface';
import { SortDirection } from '../../../../shared/domain/repository/search-params';
import {
  TransactionFilter,
  TransactionSearchParams,
  TransactionSearchResult,
  ITransactionRepository,
} from '../../../domain/transaction.repository';
import {
  TransactionOutput,
  TransactionOutputMapper,
} from '../common/transaction-output';

export class ListTransactionsUseCase
  implements IUseCase<ListTransactionsInput, ListTransactionsOutput>
{
  constructor(private transactionRepo: ITransactionRepository) {}

  async execute(input: ListTransactionsInput): Promise<ListTransactionsOutput> {
    const params = new TransactionSearchParams(input);
    const searchResult = await this.transactionRepo.search(params);
    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: TransactionSearchResult): ListTransactionsOutput {
    const { items: _items } = searchResult;
    const items = _items.map((i) => {
      return TransactionOutputMapper.toOutput(i);
    });
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}

export type ListTransactionsInput = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: TransactionFilter | null;
};

export type ListTransactionsOutput = PaginationOutput<TransactionOutput>;

import { ISearchableRepository } from '../../shared/domain/repository/repository-interface';
import { SearchParams } from '../../shared/domain/repository/search-params';
import { SearchResult } from '../../shared/domain/repository/search-result';
import { Transaction, TransactionId } from './transaction.aggregate';

export type TransactionFilter = string;

export class TransactionSearchParams extends SearchParams<TransactionFilter> {}

export class TransactionSearchResult extends SearchResult<Transaction> {}

export interface ITransactionRepository
  extends ISearchableRepository<
    Transaction,
    TransactionId,
    TransactionFilter,
    TransactionSearchParams,
    TransactionSearchResult
  > {}

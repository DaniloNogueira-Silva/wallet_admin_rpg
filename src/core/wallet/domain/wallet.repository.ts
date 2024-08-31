import { ISearchableRepository } from '../../shared/domain/repository/repository-interface';
import { SearchParams } from '../../shared/domain/repository/search-params';
import { SearchResult } from '../../shared/domain/repository/search-result';
import { Wallet, WalletId } from './wallet.aggregate';

export type WalletFilter = string;

export class WalletSearchParams extends SearchParams<WalletFilter> {}

export class WalletSearchResult extends SearchResult<Wallet> {}

export interface IWalletRepository
  extends ISearchableRepository<
    Wallet,
    WalletId,
    WalletFilter,
    WalletSearchParams,
    WalletSearchResult
  > {}

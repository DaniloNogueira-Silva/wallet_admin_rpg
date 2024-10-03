import {
  PaginationOutput,
  PaginationOutputMapper,
} from '../../../../shared/application/pagination-output';
import { IUseCase } from '../../../../shared/application/use-case.interface';
import { SortDirection } from '../../../../shared/domain/repository/search-params';
import {
  WalletFilter,
  WalletSearchParams,
  WalletSearchResult,
  IWalletRepository,
} from '../../../domain/wallet.repository';
import {
  WalletOutput,
  WalletOutputMapper,
} from '../common/wallet-output';

export class ListWalletsUseCase
  implements IUseCase<ListWalletsInput, ListWalletsOutput>
{
  constructor(private walletRepo: IWalletRepository) {}

  async execute(input: ListWalletsInput): Promise<ListWalletsOutput> {
    const params = new WalletSearchParams(input);
    const searchResult = await this.walletRepo.search(params);
    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: WalletSearchResult): ListWalletsOutput {
    const { items: _items } = searchResult;
    const items = _items.map((i) => {
      return WalletOutputMapper.toOutput(i);
    });
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}

export type ListWalletsInput = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: WalletFilter | null;
};

export type ListWalletsOutput = PaginationOutput<WalletOutput>;

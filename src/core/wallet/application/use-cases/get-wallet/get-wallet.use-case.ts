import { IUseCase } from '../../../../shared/application/use-case.interface';
import { NotFoundError } from '../../../../shared/domain/errors/not-found.error';
import { Wallet, WalletId } from '../../../domain/wallet.aggregate';
import { IWalletRepository } from '../../../domain/wallet.repository';
import {
  WalletOutput,
  WalletOutputMapper,
} from '../common/wallet-output';

export class GetWalletUseCase
  implements IUseCase<GetWalletInput, GetWalletOutput>
{
  constructor(private walletRepo: IWalletRepository) {}

  async execute(input: GetWalletInput): Promise<GetWalletOutput> {
    const walletId = new WalletId(input.id);
    const wallet = await this.walletRepo.findById(walletId);
    if (!wallet) {
      throw new NotFoundError(input.id, Wallet);
    }

    return WalletOutputMapper.toOutput(wallet);
  }
}

export type GetWalletInput = {
  id: string;
};

export type GetWalletOutput = WalletOutput;

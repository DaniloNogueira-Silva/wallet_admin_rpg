import { IUseCase } from '../../../../shared/application/use-case.interface';
import { WalletId } from '../../../domain/wallet.aggregate';
import { IWalletRepository } from '../../../domain/wallet.repository';

export class DeleteWalletUseCase
  implements IUseCase<DeleteWalletInput, DeleteWalletOutput>
{
  constructor(private walletRepo: IWalletRepository) {}

  async execute(input: DeleteWalletInput): Promise<DeleteWalletOutput> {
    const walletId = new WalletId(input.id);
    await this.walletRepo.delete(walletId);
  }
}

export type DeleteWalletInput = {
  id: string;
};

type DeleteWalletOutput = void;

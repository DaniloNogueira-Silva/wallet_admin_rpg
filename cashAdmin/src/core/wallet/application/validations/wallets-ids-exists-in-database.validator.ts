import { Either } from '../../../shared/domain/either';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';
import { Wallet, WalletId } from '../../domain/wallet.aggregate';
import { IWalletRepository } from '../../domain/wallet.repository';

export class WalletsIdExistsInDatabaseValidator {
  constructor(private walletRepo: IWalletRepository) {}

  async validate(
    wallets_id: string[],
  ): Promise<Either<WalletId[], NotFoundError[]>> {
    const walletsId = wallets_id.map((v) => new WalletId(v));

    const existsResult = await this.walletRepo.existsById(walletsId);
    return existsResult.not_exists.length > 0
      ? Either.fail(
          existsResult.not_exists.map((c) => new NotFoundError(c.id, Wallet)),
        )
      : Either.ok(walletsId);
  }
}

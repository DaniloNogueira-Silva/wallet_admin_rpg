import { NotFoundError } from '../../../../../shared/domain/errors/not-found.error';
import { InvalidUuidError } from '../../../../../shared/domain/value-objects/uuid.vo';
import { Wallet, WalletId } from '../../../../domain/wallet.aggregate';
import { WalletInMemoryRepository } from '../../../../infra/db/in-memory/wallet-in-memory.repository';
import { DeleteWalletUseCase } from '../delete-wallet.use-case';

describe('DeleteWalletUseCase Unit Tests', () => {
  let useCase: DeleteWalletUseCase;
  let repository: WalletInMemoryRepository;

  beforeEach(() => {
    repository = new WalletInMemoryRepository();
    useCase = new DeleteWalletUseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    await expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new InvalidUuidError(),
    );

    const walletId = new WalletId();

    await expect(() => useCase.execute({ id: walletId.id })).rejects.toThrow(
      new NotFoundError(walletId.id, Wallet),
    );
  });

  it('should delete a wallet', async () => {
    const items = [new Wallet({ user_id: 'test 1' })];
    repository.items = items;
    await useCase.execute({
      id: items[0].wallet_id.id,
    });
    expect(repository.items).toHaveLength(0);
  });
});

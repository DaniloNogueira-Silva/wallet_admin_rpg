import { NotFoundError } from "../../../../../shared/domain/errors/not-found.error";
import { InvalidUuidError } from "../../../../../shared/domain/value-objects/uuid.vo";
import { Wallet, WalletId } from "../../../../domain/wallet.aggregate";
import { WalletInMemoryRepository } from "../../../../infra/db/in-memory/wallet-in-memory.repository";
import { GetWalletUseCase } from "../get-wallet.use-case";

describe("GetWalletUseCase Unit Tests", () => {
  let useCase: GetWalletUseCase;
  let repository: WalletInMemoryRepository;

  beforeEach(() => {
    repository = new WalletInMemoryRepository();
    useCase = new GetWalletUseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new InvalidUuidError()
    );

    const walletId = new WalletId();
    await expect(() => useCase.execute({ id: walletId.id })).rejects.toThrow(
      new NotFoundError(walletId.id, Wallet)
    );
  });

  it("should returns a wallet", async () => {
    const items = [Wallet.create({ user_id: "123456" })];
    repository.items = items;
    const spyFindById = jest.spyOn(repository, "findById");
    const output = await useCase.execute({ id: items[0].wallet_id.id });
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: items[0].wallet_id.id,
      user_id: "123456",
      balance: 0,
      savings: 0,
      created_at: items[0].created_at,
    });
  });
});

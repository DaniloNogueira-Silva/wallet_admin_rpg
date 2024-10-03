import { setupSequelize } from "../../../../../shared/infra/testing/helpers";
import { WalletId } from "../../../../domain/wallet.aggregate";
import { WalletSequelizeRepository } from "../../../../infra/db/sequelize/wallet-sequelize.repository";
import { WalletModel } from "../../../../infra/db/sequelize/wallet.model";
import { CreateWalletUseCase } from "../create-wallet.use-case";

describe("CreateWalletUseCase Integration Tests", () => {
  let useCase: CreateWalletUseCase;
  let repository: WalletSequelizeRepository;

  setupSequelize({ models: [WalletModel] });

  beforeEach(() => {
    repository = new WalletSequelizeRepository(WalletModel);
    useCase = new CreateWalletUseCase(repository);
  });

  it("should create a wallet", async () => {
    let output = await useCase.execute({ user_id: "12345-6789" });
    let entity = await repository.findById(new WalletId(output.id));
    expect(output).toStrictEqual({
      id: entity!.wallet_id.id,
      user_id: "12345-6789",
      balance: 0,
      savings: 0,
      created_at: entity!.created_at,
    });

    output = await useCase.execute({
      user_id: "12345-6789",
      balance: 1000,
      savings: 0,
    });
    entity = await repository.findById(new WalletId(output.id));
    expect(output).toStrictEqual({
      id: entity!.wallet_id.id,
      user_id: "12345-6789",
      balance: 1000,
      savings: 0,
      created_at: entity!.created_at,
    });

    output = await useCase.execute({
      user_id: "12345-6789",
      balance: 1000,
      savings: 0,
    });
    entity = await repository.findById(new WalletId(output.id));
    expect(output).toStrictEqual({
      id: entity!.wallet_id.id,
      user_id: "12345-6789",
      balance: 1000,
      savings: 0,
      created_at: entity!.created_at,
    });

    output = await useCase.execute({
      user_id: "12345-6789",
      balance: 1000,
      savings: 0,
    });
    entity = await repository.findById(new WalletId(output.id));
    expect(output).toStrictEqual({
      id: entity!.wallet_id.id,
      user_id: "12345-6789",
      balance: 1000,
      savings: 0,
      created_at: entity!.created_at,
    });
  });
});

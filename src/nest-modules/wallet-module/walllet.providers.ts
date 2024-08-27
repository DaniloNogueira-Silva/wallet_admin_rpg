import { WalletsIdExistsInDatabaseValidator } from "@core/wallet/application/validations/wallets-ids-exists-in-database.validator";
import { getModelToken } from "@nestjs/sequelize";
import { WalletInMemoryRepository } from "../../core/wallet/infra/db/in-memory/wallet-in-memory.repository";
import { WalletSequelizeRepository } from "@core/wallet/infra/db/sequelize/wallet-sequelize.repository";
import { WalletModel } from "@core/wallet/infra/db/sequelize/wallet.model";
import { CreateWalletUseCase } from "@core/wallet/application/use-cases/create-wallet/create-wallet.use-case";
import { IWalletRepository } from "@core/wallet/domain/wallet.repository";
import { UpdateWalletUseCase } from "@core/wallet/application/use-cases/update-wallet/update-wallet.use-case";
import { ListWalletsUseCase } from "@core/wallet/application/use-cases/list-wallets/list-wallets.use-case";
import { GetWalletUseCase } from "@core/wallet/application/use-cases/get-wallet/get-wallet.use-case";
import { DeleteWalletUseCase } from "@core/wallet/application/use-cases/delete-wallet/delete-wallet.use-case";

export const REPOSITORIES = {
  WALLET_REPOSITORY: {
    provide: "WalletRepository",
    useExisting: WalletSequelizeRepository,
  },
  WALLET_IN_MEMORY_REPOSITORY: {
    provide: WalletInMemoryRepository,
    useClass: WalletInMemoryRepository,
  },
  WALLET_SEQUELIZE_REPOSITORY: {
    provide: WalletSequelizeRepository,
    useFactory: (walletModel: typeof WalletModel) => {
      return new WalletSequelizeRepository(walletModel);
    },
    inject: [getModelToken(WalletModel)],
  },
};

export const USE_CASES = {
  CREATE_WALLET_USE_CASE: {
    provide: CreateWalletUseCase,
    useFactory: (walletRepo: IWalletRepository) => {
      return new CreateWalletUseCase(walletRepo);
    },
    inject: [REPOSITORIES.WALLET_REPOSITORY.provide],
  },
  UPDATE_WALLET_USE_CASE: {
    provide: UpdateWalletUseCase,
    useFactory: (walletRepo: IWalletRepository) => {
      return new UpdateWalletUseCase(walletRepo);
    },
    inject: [REPOSITORIES.WALLET_REPOSITORY.provide],
  },
  LIST_WALLETS_USE_CASE: {
    provide: ListWalletsUseCase,
    useFactory: (walletRepo: IWalletRepository) => {
      return new ListWalletsUseCase(walletRepo);
    },
    inject: [REPOSITORIES.WALLET_REPOSITORY.provide],
  },
  GET_WALLET_USE_CASE: {
    provide: GetWalletUseCase,
    useFactory: (walletRepo: IWalletRepository) => {
      return new GetWalletUseCase(walletRepo);
    },
    inject: [REPOSITORIES.WALLET_REPOSITORY.provide],
  },
  DELETE_WALLET_USE_CASE: {
    provide: DeleteWalletUseCase,
    useFactory: (walletRepo: IWalletRepository) => {
      return new DeleteWalletUseCase(walletRepo);
    },
    inject: [REPOSITORIES.WALLET_REPOSITORY.provide],
  },
};

export const VALIDATIONS = {
  WALLETS_IDS_EXISTS_IN_DATABASE_VALIDATOR: {
    provide: WalletsIdExistsInDatabaseValidator,
    useFactory: (walletRepo: IWalletRepository) => {
      return new WalletsIdExistsInDatabaseValidator(walletRepo);
    },
    inject: [REPOSITORIES.WALLET_REPOSITORY.provide],
  },
};

export const WALLET_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
  VALIDATIONS,
};

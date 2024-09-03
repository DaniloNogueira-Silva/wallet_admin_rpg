import { Module } from '@nestjs/common';
import { WalletsController } from './walllet.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { WalletModel } from '../../core/wallet/infra/db/sequelize/wallet.model';
import { WALLET_PROVIDERS } from './walllet.providers';

@Module({
  imports: [SequelizeModule.forFeature([WalletModel])],
  controllers: [WalletsController],
  providers: [
    ...Object.values(WALLET_PROVIDERS.REPOSITORIES),
    ...Object.values(WALLET_PROVIDERS.USE_CASES),
    ...Object.values(WALLET_PROVIDERS.VALIDATIONS),
  ],
  exports: [
    WALLET_PROVIDERS.REPOSITORIES.WALLET_REPOSITORY.provide,
    WALLET_PROVIDERS.VALIDATIONS.WALLETS_IDS_EXISTS_IN_DATABASE_VALIDATOR
      .provide,
  ],
})
export class WalletsModule {}

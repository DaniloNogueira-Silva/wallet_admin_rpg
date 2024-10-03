import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionModel } from '../../core/transactions/infra/db/sequelize/transaction.model';
import { TransactionsController } from './transaction.controller';
import { TRANSACTION_PROVIDERS } from './transaction.providers';

@Module({
  imports: [SequelizeModule.forFeature([TransactionModel])],
  controllers: [TransactionsController],
  providers: [
    ...Object.values(TRANSACTION_PROVIDERS.REPOSITORIES),
    ...Object.values(TRANSACTION_PROVIDERS.USE_CASES),
    ...Object.values(TRANSACTION_PROVIDERS.VALIDATIONS),
  ],
  exports: [
    TRANSACTION_PROVIDERS.REPOSITORIES.TRANSACTION_REPOSITORY.provide,
    TRANSACTION_PROVIDERS.VALIDATIONS.TRANSACTIONS_IDS_EXISTS_IN_DATABASE_VALIDATOR
      .provide,
  ],
})
export class TransactionsModule {}


import { getModelToken } from "@nestjs/sequelize";
import { TransactionInMemoryRepository } from "../../core/transactions/infra/db/in-memory/transaction-in-memory.repository";
import { TransactionSequelizeRepository } from "../../core/transactions/infra/db/sequelize/transaction-sequelize.repository";
import { TransactionModel } from "../../core/transactions/infra/db/sequelize/transaction.model";
import { CreateTransactionUseCase } from "../../core/transactions/application/use-cases/create-transaction/create-transaction.use-case";
import { ITransactionRepository } from "../../core/transactions/domain/transaction.repository";
import { UpdateTransactionUseCase } from "../../core/transactions/application/use-cases/update-transaction/update-transaction.use-case";

import { GetTransactionUseCase } from "../../core/transactions/application/use-cases/get-transaction/get-transaction.use-case";
import { DeleteTransactionUseCase } from "../../core/transactions/application/use-cases/delete-transaction/delete-transaction.use-case";
import { ListTransactionsUseCase } from "../../core/transactions/application/use-cases/list-transactions/list-transaction.use-case";
import { TransactionsIdExistsInDatabaseValidator } from "../../core/transactions/application/validations/transaction-ids-exists-in-database.validator";

export const REPOSITORIES = {
  TRANSACTION_REPOSITORY: {
    provide: "TransactionRepository",
    useExisting: TransactionSequelizeRepository,
  },
  TRANSACTION_IN_MEMORY_REPOSITORY: {
    provide: TransactionInMemoryRepository,
    useClass: TransactionInMemoryRepository,
  },
  TRANSACTION_SEQUELIZE_REPOSITORY: {
    provide: TransactionSequelizeRepository,
    useFactory: (transactionModel: typeof TransactionModel) => {
      return new TransactionSequelizeRepository(transactionModel);
    },
    inject: [getModelToken(TransactionModel)],
  },
};

export const USE_CASES = {
  CREATE_TRANSACTION_USE_CASE: {
    provide: CreateTransactionUseCase,
    useFactory: (transactionRepo: ITransactionRepository) => {
      return new CreateTransactionUseCase(transactionRepo);
    },
    inject: [REPOSITORIES.TRANSACTION_REPOSITORY.provide],
  },
  UPDATE_TRANSACTION_USE_CASE: {
    provide: UpdateTransactionUseCase,
    useFactory: (transactionRepo: ITransactionRepository) => {
      return new UpdateTransactionUseCase(transactionRepo);
    },
    inject: [REPOSITORIES.TRANSACTION_REPOSITORY.provide],
  },
  LIST_TRANSACTIONS_USE_CASE: {
    provide: ListTransactionsUseCase,
    useFactory: (transactionRepo: ITransactionRepository) => {
      return new ListTransactionsUseCase(transactionRepo);
    },
    inject: [REPOSITORIES.TRANSACTION_REPOSITORY.provide],
  },
  GET_TRANSACTION_USE_CASE: {
    provide: GetTransactionUseCase,
    useFactory: (transactionRepo: ITransactionRepository) => {
      return new GetTransactionUseCase(transactionRepo);
    },
    inject: [REPOSITORIES.TRANSACTION_REPOSITORY.provide],
  },
  DELETE_TRANSACTION_USE_CASE: {
    provide: DeleteTransactionUseCase,
    useFactory: (transactionRepo: ITransactionRepository) => {
      return new DeleteTransactionUseCase(transactionRepo);
    },
    inject: [REPOSITORIES.TRANSACTION_REPOSITORY.provide],
  },
};

export const VALIDATIONS = {
  TRANSACTIONS_IDS_EXISTS_IN_DATABASE_VALIDATOR: {
    provide: TransactionsIdExistsInDatabaseValidator,
    useFactory: (transactionRepo: ITransactionRepository) => {
      return new TransactionsIdExistsInDatabaseValidator(transactionRepo);
    },
    inject: [REPOSITORIES.TRANSACTION_REPOSITORY.provide],
  },
};

export const TRANSACTION_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
  VALIDATIONS,
};

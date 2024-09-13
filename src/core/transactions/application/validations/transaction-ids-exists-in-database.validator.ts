import { Either } from '../../../shared/domain/either';
import { NotFoundError } from '../../../shared/domain/errors/not-found.error';
import { Transaction, TransactionId } from '../../domain/transaction.aggregate';
import { ITransactionRepository } from '../../domain/transaction.repository';

export class TransactionsIdExistsInDatabaseValidator {
  constructor(private transactionRepo: ITransactionRepository) {}

  async validate(
    transactions_id: string[],
  ): Promise<Either<TransactionId[], NotFoundError[]>> {
    const transactionsId = transactions_id.map((v) => new TransactionId(v));

    const existsResult = await this.transactionRepo.existsById(transactionsId);
    return existsResult.not_exists.length > 0
      ? Either.fail(
          existsResult.not_exists.map((c) => new NotFoundError(c.id, Transaction)),
        )
      : Either.ok(transactionsId);
  }
}

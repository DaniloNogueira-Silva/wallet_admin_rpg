import { IUseCase } from '../../../../shared/application/use-case.interface';
import { NotFoundError } from '../../../../shared/domain/errors/not-found.error';
import { Transaction, TransactionId } from '../../../domain/transaction.aggregate';
import { ITransactionRepository } from '../../../domain/transaction.repository';
import {
  TransactionOutput,
  TransactionOutputMapper,
} from '../common/transaction-output';

export class GetTransactionUseCase
  implements IUseCase<GetTransactionInput, GetTransactionOutput>
{
  constructor(private transactionRepo: ITransactionRepository) {}

  async execute(input: GetTransactionInput): Promise<GetTransactionOutput> {
    const transactionId = new TransactionId(input.id);
    const transaction = await this.transactionRepo.findById(transactionId);
    if (!transaction) {
      throw new NotFoundError(input.id, Transaction);
    }

    return TransactionOutputMapper.toOutput(transaction);
  }
}

export type GetTransactionInput = {
  id: string;
};

export type GetTransactionOutput = TransactionOutput;

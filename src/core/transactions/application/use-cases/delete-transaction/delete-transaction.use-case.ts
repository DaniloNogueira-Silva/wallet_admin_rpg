import { IUseCase } from '../../../../shared/application/use-case.interface';
import { TransactionId } from '../../../domain/transaction.aggregate';
import { ITransactionRepository } from '../../../domain/transaction.repository';

export class DeleteTransactionUseCase
  implements IUseCase<DeleteTransactionInput, DeleteTransactionOutput>
{
  constructor(private transactionRepo: ITransactionRepository) {}

  async execute(input: DeleteTransactionInput): Promise<DeleteTransactionOutput> {
    const transactionId = new TransactionId(input.id);
    await this.transactionRepo.delete(transactionId);
  }
}

export type DeleteTransactionInput = {
  id: string;
};

type DeleteTransactionOutput = void;

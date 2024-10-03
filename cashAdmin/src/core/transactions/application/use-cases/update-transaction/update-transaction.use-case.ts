import { EntityValidationError } from "../../../../shared/domain/validators/validator.error";
import { IUseCase } from "../../../../shared/application/use-case.interface";
import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";
import {
  Transaction,
  TransactionId,
} from "../../../domain/transaction.aggregate";
import { ITransactionRepository } from "../../../domain/transaction.repository";
import {
  TransactionOutput,
  TransactionOutputMapper,
} from "../common/transaction-output";
import { UpdateTransactionInput } from "./update-transaction.input";

export class UpdateTransactionUseCase
  implements IUseCase<UpdateTransactionInput, UpdateTransactionOutput>
{
  constructor(private transactionRepo: ITransactionRepository) {}

  async execute(
    input: UpdateTransactionInput
  ): Promise<UpdateTransactionOutput> {
    const transactionId = new TransactionId(input.id);
    const transaction = await this.transactionRepo.findById(transactionId);

    if (!transaction) {
      throw new NotFoundError(input.id, Transaction);
    }

    if (input.status) {
      transaction.changeStatus(input.status);
    }

    if (input.type) {
      transaction.changeType(input.type);
    }

    if (input.value) {
      transaction.changeValue(input.value);
    }

    if (transaction.notification.hasErrors()) {
      throw new EntityValidationError(transaction.notification.toJSON());
    }

    await this.transactionRepo.update(transaction);

    return TransactionOutputMapper.toOutput(transaction);
  }
}

export type UpdateTransactionOutput = TransactionOutput;

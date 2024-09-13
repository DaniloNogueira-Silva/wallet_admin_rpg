import { EntityValidationError } from "../../../../shared/domain/validators/validator.error";
import { IUseCase } from "../../../../shared/application/use-case.interface";
import { Transaction } from "../../../domain/transaction.aggregate";
import { ITransactionRepository } from "../../../domain/transaction.repository";
import { TransactionOutput, TransactionOutputMapper } from "../common/transaction-output";
import { CreateTransactionInput } from "./create-transaction.input";

export class CreateTransactionUseCase
  implements IUseCase<CreateTransactionInput, CreateTransactionOutput>
{
  constructor(private readonly transactionRepo: ITransactionRepository) {}

  async execute(input: CreateTransactionInput): Promise<CreateTransactionOutput> {
    const entity = Transaction.create(input);

    if (entity.notification.hasErrors()) {
      throw new EntityValidationError(entity.notification.toJSON());
    }

    await this.transactionRepo.insert(entity);

    return TransactionOutputMapper.toOutput(entity);
  }
}

export type CreateTransactionOutput = TransactionOutput;

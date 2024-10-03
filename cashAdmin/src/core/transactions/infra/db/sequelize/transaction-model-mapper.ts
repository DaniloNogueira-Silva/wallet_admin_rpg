import { LoadEntityError } from "../../../../shared/domain/validators/validator.error";
import {
  Transaction,
  TransactionId,
} from "../../../domain/transaction.aggregate";
import { TransactionModel } from "./transaction.model";

export class TransactionModelMapper {
  static toModel(entity: Transaction): TransactionModel {
    return TransactionModel.build({
      transaction_id: entity.transaction_id?.id,
      wallet_id: entity.wallet_id,
      category_id: entity.category_id,
      name: entity.name,
      status: entity.status,
      value: entity.value,
      type: entity.type,
      effective_date: entity.effective_date,
      created_at: entity.created_at,
    });
  }

  static toEntity(model: TransactionModel): Transaction {
    const transaction = new Transaction({
      transaction_id: new TransactionId(model.transaction_id),
      wallet_id: model.wallet_id,
      category_id: model.category_id,
      name: model.name,
      status: model.status,
      value: model.value,
      type: model.type,
      effective_date: model.effective_date,
      created_at: model.created_at,
    });

    if (transaction.notification.hasErrors()) {
      throw new LoadEntityError(transaction.notification.toJSON());
    }
    return transaction;
  }
}

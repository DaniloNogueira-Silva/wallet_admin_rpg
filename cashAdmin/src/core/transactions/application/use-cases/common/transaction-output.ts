import { Transaction } from "../../../domain/transaction.aggregate";

export type TransactionOutput = {
  id: string;
  wallet_id: string;
  category_id: string;
  value: number;
  name: string;
  status: string;
  type: string;
  effective_date: Date;
  created_at: Date;
};

export class TransactionOutputMapper {
  static toOutput(entity: Transaction): TransactionOutput {
    const { transaction_id, ...otherProps } = entity.toJSON();
    return {
      id: transaction_id,
      ...otherProps,
    };
  }
}

import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { AggregateRoot } from "../../shared/domain/aggregate-root";
import { ValueObject } from "../../shared/domain/value-object";
import { TransactionFakeBuilder } from "./transaction-fake.builder";

export type TransactionsConstructorProps = {
  transaction_id?: TransactionId;
  wallet_id: string;
  category_id: string;
  name: string;
  status: string;
  value: number;
  type: string;
  effective_date: Date;
  created_at?: Date;
};

export type TransactionsCreateCommand = {
  wallet_id: string;
  category_id: string;
  name: string;
  status: string;
  value: number;
  type: string;
  effective_date: Date;
};

export class TransactionId extends Uuid {}

export class Transaction extends AggregateRoot {
  transaction_id: TransactionId;
  wallet_id: string;
  category_id: string;
  name: string;
  status: string;
  value: number;
  type: string;
  effective_date: Date;
  created_at: Date;

  constructor(props: TransactionsConstructorProps) {
    super();
    this.transaction_id = props.transaction_id ?? new TransactionId();
    this.wallet_id = props.wallet_id;
    this.category_id = props.category_id;
    this.name = props.name;
    this.status = props.status;
    this.value = props.value;
    this.type = props.type;
    this.effective_date = props.effective_date;
    this.created_at = props.created_at ?? new Date();
  }

  get entity_id(): ValueObject {
    return this.transaction_id!;
  }

  static create(props: TransactionsCreateCommand): Transaction {
    const transactions = new Transaction({
      ...props,
      transaction_id: new TransactionId(),
      created_at: new Date(),
    });
    return transactions;
  }

  changeStatus(status: string): void {
    this.status = status;
  }

  changeValue(value: number): void {
    this.value = value;
  }

  changeType(type: string): void {
    this.type = type;
  }

  static fake() {
    return TransactionFakeBuilder;
  }

  toJSON() {
    return {
      transaction_id: this.transaction_id?.id,
      wallet_id: this.wallet_id,
      category_id: this.category_id,
      name: this.name,
      status: this.status,
      value: this.value,
      type: this.type,
      effective_date: this.effective_date,
      created_at: this.created_at,
    };
  }
}

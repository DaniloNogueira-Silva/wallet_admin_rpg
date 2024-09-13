import { Chance } from "chance";
import { TransactionId, Transaction } from "./transaction.aggregate";

type PropOrFactory<T> = T | ((index: number) => T);

export class TransactionFakeBuilder<TBuild = any> {
  // auto generated in entity
  private _transaction_id: PropOrFactory<TransactionId> | undefined = undefined;
  private _wallet_id: PropOrFactory<string>;
  private _category_id: PropOrFactory<string>;
  private _name: PropOrFactory<string>;
  private _status: PropOrFactory<string>;
  private _value: PropOrFactory<number>;
  private _type: PropOrFactory<string>;
  private _effective_date: PropOrFactory<Date>;
  // auto generated in entity
  private _created_at: PropOrFactory<Date> | undefined = undefined;

  private countObjs;

  static aTransaction() {
    return new TransactionFakeBuilder<Transaction>();
  }

  static theTransactions(countObjs: number) {
    return new TransactionFakeBuilder<Transaction[]>(countObjs);
  }

  private chance: Chance.Chance;

  private constructor(countObjs: number = 1) {
    this.countObjs = countObjs;
    this.chance = Chance();
  }

  withTransactionId(valueOrFactory: PropOrFactory<TransactionId>) {
    this._transaction_id = valueOrFactory;
    return this;
  }

  withWalletId(valueOrFactory: PropOrFactory<string>) {
    this._wallet_id = valueOrFactory;
    return this;
  }

  withCategoryId(valueOrFactory: PropOrFactory<string>) {
    this._category_id = valueOrFactory;
    return this;
  }

  withName(valueOrFactory: PropOrFactory<string>) {
    this._name = valueOrFactory;
    return this;
  }

  withStatus(valueOrFactory: PropOrFactory<string>) {
    this._status = valueOrFactory;
    return this;
  }

  withValue(valueOrFactory: PropOrFactory<number>) {
    this._value = valueOrFactory;
    return this;
  }

  withType(valueOrFactory: PropOrFactory<string>) {
    this._type = valueOrFactory;
    return this;
  }

  withEffectiveDate(valueOrFactory: PropOrFactory<Date>) {
    this._effective_date = valueOrFactory;
    return this;
  }

  withCreatedAt(valueOrFactory: PropOrFactory<Date>) {
    this._created_at = valueOrFactory;
    return this;
  }

  build(): TBuild {
    const transactions = new Array(this.countObjs)
      .fill(undefined)
      .map((_, index) => {
        const transaction = new Transaction({
          transaction_id: !this._transaction_id
            ? undefined
            : this.callFactory(this._transaction_id, index),
          wallet_id: this.callFactory(this._wallet_id, index),
          category_id: this.callFactory(this._category_id, index),
          name: this.callFactory(this._name, index),
          status: this.callFactory(this._status, index),
          value: this.callFactory(this._value, index),
          type: this.callFactory(this._type, index),
          effective_date: this.callFactory(this._effective_date, index),
          ...(this._created_at && {
            created_at: this.callFactory(this._created_at, index),
          }),
        });
        return transaction;
      });
    return this.countObjs === 1 ? (transactions[0] as any) : transactions;
  }

  get transactions_id() {
    return this.getValue("transactions_id");
  }

  get wallet_id() {
    return this.getValue("wallet_id");
  }

  get category_id() {
    return this.getValue("category_id");
  }

  get name() {
    return this.getValue("name");
  }

  get status() {
    return this.getValue("status");
  }

  get value() {
    return this.getValue("value");
  }

  get type() {
    return this.getValue("type");
  }

  get effective_date() {
    return this.getValue("effective_date");
  }

  get created_at() {
    return this.getValue("created_at");
  }

  private getValue(prop: any) {
    const optional = ["transactions_id", "created_at"];
    const privateProp = `_${prop}` as keyof this;
    if (!this[privateProp] && optional.includes(prop)) {
      throw new Error(
        `Property ${prop} does not have a factory, use 'with' methods`
      );
    }
    return this.callFactory(this[privateProp], 0);
  }

  private callFactory(factoryOrValue: PropOrFactory<any>, index: number) {
    return typeof factoryOrValue === "function"
      ? factoryOrValue(index)
      : factoryOrValue;
  }
}

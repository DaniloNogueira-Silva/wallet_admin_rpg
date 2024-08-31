import { AggregateRoot } from "../../shared/domain/aggregate-root";
import { ValueObject } from "../../shared/domain/value-object";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { WalletFakeBuilder } from "./wallet-fake.builder";
import { WalletValidatorFactory } from "./wallet.validator";

export type WalletConstructorProps = {
  wallet_id?: WalletId;
  user_id: string;
  balance?: number;
  savings?: number;
  created_at?: Date;
};

export type WalletCreateCommand = {
  user_id: string;
  balance?: number;
  savings?: number;
};

export class WalletId extends Uuid {}

export class Wallet extends AggregateRoot {
  wallet_id: WalletId;
  user_id: string;
  balance: number;
  savings: number;
  created_at: Date;

  constructor(props: WalletConstructorProps) {
    super();
    this.wallet_id = props.wallet_id ?? new WalletId();
    this.user_id = props.user_id;
    this.balance = props.balance ?? 0;
    this.savings = props.savings ?? 0;
    this.created_at = props.created_at ?? new Date();
  }

  get entity_id(): ValueObject {
    return this.wallet_id;
  }

  static create(props: WalletCreateCommand): Wallet {
    const wallet = new Wallet({
      ...props,
      user_id: props.user_id,
      created_at: new Date(),

    });
    wallet.validate(["user_id", "balance", "savings"]);
    return wallet;
  }

  changeBalance(balance: number): void {
    this.balance = balance;
  }

  changeSavings(savings: number): void {
    this.savings = savings;
  }

  validate(fields?: string[]): boolean {
    const validator = WalletValidatorFactory.create();
    return validator.validate(this.notification, this, fields);
  }

  static fake() {
    return WalletFakeBuilder;
  }

  toJSON() {
    return {
      wallet_id: this.wallet_id.id,
      user_id: this.user_id,
      balance: this.balance,
      savings: this.savings,
      created_at: this.created_at,
    };
  }
}

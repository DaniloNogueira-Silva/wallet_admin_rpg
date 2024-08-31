import { Chance } from "chance";
import { Wallet, WalletId } from "./wallet.aggregate";

type PropOrFactory<T> = T | ((index: number) => T);

export class WalletFakeBuilder<TBuild = any> {
  // auto generated in entity
  private _wallet_id: PropOrFactory<WalletId> | undefined = undefined;
  private _user_id: PropOrFactory<string>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _balance: PropOrFactory<number | null> = (_index) =>
    this.chance.floating();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _savings: PropOrFactory<number | null> = (_index) =>
    this.chance.floating();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // auto generated in entity
  private _created_at: PropOrFactory<Date> | undefined = undefined;

  private countObjs;

  static aWallet() {
    return new WalletFakeBuilder<Wallet>();
  }

  static theWallets(countObjs: number) {
    return new WalletFakeBuilder<Wallet[]>(countObjs);
  }

  private chance: Chance.Chance;

  private constructor(countObjs: number = 1) {
    this.countObjs = countObjs;
    this.chance = Chance();
  }

  withWalletId(valueOrFactory: PropOrFactory<WalletId>) {
    this._wallet_id = valueOrFactory;
    return this;
  }

  withUserId(valueOrFactory: PropOrFactory<string>) {
    this._user_id = valueOrFactory;
    return this;
  }

  withBalance(valueOrFactory: PropOrFactory<number | null>) {
    this._balance = valueOrFactory;
    return this;
  }

  withSavings(valueOrFactory: PropOrFactory<number | null>) {
    this._savings = valueOrFactory;
    return this;
  }

  withCreatedAt(valueOrFactory: PropOrFactory<Date>) {
    this._created_at = valueOrFactory;
    return this;
  }

  build(): TBuild {
    const wallets = new Array(this.countObjs)
      .fill(undefined)
      .map((_, index) => {
        const wallet = new Wallet({
          wallet_id: !this._wallet_id
            ? undefined
            : this.callFactory(this._wallet_id, index),
          user_id: this.callFactory(this._user_id, index),
          balance: this.callFactory(this._balance, index),
          savings: this.callFactory(this._savings, index),
          ...(this._created_at && {
            created_at: this.callFactory(this._created_at, index),
          }),
        });
        wallet.validate();
        return wallet;
      });
    return this.countObjs === 1 ? (wallets[0] as any) : wallets;
  }

  get wallet_id() {
    return this.getValue("wallet_id");
  }

  get user_id() {
    return this.getValue("user_id");
  }

  get balance() {
    return this.getValue("balance");
  }

  get savings() {
    return this.getValue("savings");
  }

  get created_at() {
    return this.getValue("created_at");
  }

  get updated_at() {
    return this.getValue("updated_at");
  }

  get deleted_at() {
    return this.getValue("deleted_at");
  }
  private getValue(prop: any) {
    const optional = ["wallet_id", "created_at"];
    const privateProp = `_${prop}` as keyof this;
    if (!this[privateProp] && optional.includes(prop)) {
      throw new Error(
        `Property ${prop} not have a factory, use 'with' methods`
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

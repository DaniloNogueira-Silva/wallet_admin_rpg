import { Wallet } from "../../../domain/wallet.aggregate";

export type WalletOutput = {
  id: string;
  user_id: string;
  balance: number | null;
  savings: number | null;
  created_at: Date;
};

export class WalletOutputMapper {
  static toOutput(entity: Wallet): WalletOutput {
    const { wallet_id, ...otherProps } = entity.toJSON();
    return {
      id: wallet_id,
      ...otherProps,
    };
  }
}

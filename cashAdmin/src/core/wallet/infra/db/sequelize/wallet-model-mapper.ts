import { LoadEntityError } from "../../../../shared/domain/validators/validator.error";
import { Wallet, WalletId } from "../../../domain/wallet.aggregate";
import { WalletModel } from "./wallet.model";

export class WalletModelMapper {
  static toModel(entity: Wallet): WalletModel {
    return WalletModel.build({
      wallet_id: entity.wallet_id.id,
      user_id: entity.user_id,
      balance: entity.balance,
      savings: entity.savings,
      created_at: entity.created_at,
    });
  }

  static toEntity(model: WalletModel): Wallet {
    const wallet = new Wallet({
      wallet_id: new WalletId(model.wallet_id),
      user_id: model.user_id,
      balance: model.balance,
      savings: model.savings,
      created_at: model.created_at,
    });

    wallet.validate();
    if (wallet.notification.hasErrors()) {
      throw new LoadEntityError(wallet.notification.toJSON());
    }
    return wallet;
  }
}

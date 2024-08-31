import { EntityValidationError } from "@core/shared/domain/validators/validator.error";
import { IUseCase } from "../../../../shared/application/use-case.interface";
import { NotFoundError } from "../../../../shared/domain/errors/not-found.error";
import { Wallet, WalletId } from "../../../domain/wallet.aggregate";
import { IWalletRepository } from "../../../domain/wallet.repository";
import { WalletOutput, WalletOutputMapper } from "../common/wallet-output";
import { UpdateWalletInput } from "./update-wallet.input";

export class UpdateWalletUseCase
  implements IUseCase<UpdateWalletInput, UpdateWalletOutput>
{
  constructor(private walletRepo: IWalletRepository) {}

  async execute(input: UpdateWalletInput): Promise<UpdateWalletOutput> {
    const walletId = new WalletId(input.id);
    const wallet = await this.walletRepo.findById(walletId);

    if (!wallet) {
      throw new NotFoundError(input.id, Wallet);
    }

    if (input.balance !== undefined) {
      wallet.changeBalance(input.balance);
    }

    if (input.savings !== undefined) {
      wallet.changeSavings(input.savings);
    }

    if (wallet.notification.hasErrors()) {
      throw new EntityValidationError(wallet.notification.toJSON());
    }

    await this.walletRepo.update(wallet);

    return WalletOutputMapper.toOutput(wallet);
  }
}

export type UpdateWalletOutput = WalletOutput;

import { EntityValidationError } from "@core/shared/domain/validators/validator.error";
import { IUseCase } from "../../../../shared/application/use-case.interface";
import { Wallet } from "../../../domain/wallet.aggregate";
import { IWalletRepository } from "../../../domain/wallet.repository";
import { WalletOutput, WalletOutputMapper } from "../common/wallet-output";
import { CreateWalletInput } from "./create-wallet.input";

export class CreateWalletUseCase
  implements IUseCase<CreateWalletInput, CreateWalletOutput>
{
  constructor(private readonly walletRepo: IWalletRepository) {}

  async execute(input: CreateWalletInput): Promise<CreateWalletOutput> {
    const entity = Wallet.create(input);

    if (entity.notification.hasErrors()) {
      throw new EntityValidationError(entity.notification.toJSON());
    }

    await this.walletRepo.insert(entity);

    return WalletOutputMapper.toOutput(entity);
  }
}

export type CreateWalletOutput = WalletOutput;

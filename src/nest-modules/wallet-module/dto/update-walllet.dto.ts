import { OmitType } from "@nestjs/mapped-types";
import { UpdateWalletInput } from "../../../core/wallet/application/use-cases/update-wallet/update-wallet.input";

export class UpdateWalletInputWithoutId extends OmitType(UpdateWalletInput, [
  "id",
] as const) {}

export class UpdateWalletDto extends UpdateWalletInputWithoutId {}

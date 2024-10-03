import { OmitType } from "@nestjs/mapped-types";
import { UpdateTransactionInput } from "../../../core/transactions/application/use-cases/update-transaction/update-transaction.input";

export class UpdateTransactionInputWithoutId extends OmitType(UpdateTransactionInput, [
  "id",
] as const) {}

export class UpdateTransactionDto extends UpdateTransactionInputWithoutId {}

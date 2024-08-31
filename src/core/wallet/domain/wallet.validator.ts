import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from "class-validator";
import { Wallet } from "./wallet.aggregate";
import { ClassValidatorFields } from "../../shared/domain/validators/class-validator-fields";
import { Notification } from "../../shared/domain/validators/notification";

//criar um testes que verifique os decorators
export class WalletRules {
  @MaxLength(255, { groups: ["user_id"] })
  @IsNotEmpty({ groups: ["user_id"] })
  user_id: string;

  @IsNumber()
  @IsOptional({ groups: ["balance"] })
  balance: number;

  @IsNumber()
  @IsOptional({ groups: ["savings"] })
  savings: number;

  constructor(entity: Wallet) {
    Object.assign(this, entity);
  }
}

export class WalletValidator extends ClassValidatorFields {
  validate(notification: Notification, data: any, fields?: string[]): boolean {
    const newFields = fields?.length
      ? fields
      : ["user_id", "balance", "savings"];
    return super.validate(notification, new WalletRules(data), newFields);
  }
}

export class WalletValidatorFactory {
  static create() {
    return new WalletValidator();
  }
}

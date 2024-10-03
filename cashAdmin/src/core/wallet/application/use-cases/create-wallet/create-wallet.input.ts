import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

export type CreateWalletInputConstructorProps = {
  user_id: string;
  balance?: number;
  savings?: number;
};

export class CreateWalletInput {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsNumber()
  @IsOptional()
  balance?: number;

  @IsNumber()
  @IsOptional()
  savings?: number;

  constructor(props: CreateWalletInputConstructorProps) {
    if (!props) return;
    this.user_id = props.user_id;
    this.balance = props.balance;
    this.savings = props.savings;
  }
}

export class ValidateCreateWalletInput {
  static validate(input: CreateWalletInput) {
    return validateSync(input);
  }
}

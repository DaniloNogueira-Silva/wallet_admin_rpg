import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from "class-validator";

export type UpdateWalletInputConstructorProps = {
  id: string;
  user_id?: string;
  balance?: number | null;
  savings?: number | null;
};

export class UpdateWalletInput {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsNumber()
  @IsOptional()
  balance?: number;

  @IsNumber()
  @IsOptional()
  savings?: number;

  constructor(props?: UpdateWalletInputConstructorProps) {
    if (!props) return;
    this.id = props.id;
    props.user_id && (this.user_id = props.user_id);
    props.balance && (this.balance = props.balance);
    props.savings && (this.savings = props.savings);
  }
}

export class ValidateUpdateWalletInput {
  static validate(input: UpdateWalletInput) {
    return validateSync(input);
  }
}

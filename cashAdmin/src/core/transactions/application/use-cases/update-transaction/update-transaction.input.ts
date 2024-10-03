import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from "class-validator";

export type UpdateTransactionInputConstructorProps = {
  id: string;
  wallet_id?: string;
  category_id: string;
  value?: number;
  name?: string;
  status?: string;
  type?: string;
  effective_date: Date;
};

export class UpdateTransactionInput {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  wallet_id: string;

  @IsString()
  @IsNotEmpty()
  category_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsNumber()
  @IsOptional()
  value: number;

  @IsString()
  @IsOptional()
  effective_date: Date;

  constructor(props?: UpdateTransactionInputConstructorProps) {
    if (!props) return;
    this.id = props.id;
    props.wallet_id && (this.wallet_id = props.wallet_id);
    props.category_id && (this.category_id = props.category_id);
    props.name && (this.name = props.name);
    props.status && (this.status = props.status);
    props.type && (this.type = props.type);
    props.value && (this.value = props.value);
    props.effective_date && (this.effective_date = props.effective_date);
  }
}

export class ValidateUpdateTransactionInput {
  static validate(input: UpdateTransactionInput) {
    return validateSync(input);
  }
}

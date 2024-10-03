import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from "class-validator";

export type CreateTransactionInputConstructorProps = {
  wallet_id: string;
  category_id: string;
  value?: number;
  name: string;
  status: string;
  type: string;
  effective_date: Date;
};

export class CreateTransactionInput {
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
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsOptional()
  value: number;

  @IsDateString()
  @IsOptional()
  effective_date: Date;

  constructor(props: CreateTransactionInputConstructorProps) {
    if (!props) return;

    this.wallet_id = props.wallet_id;
    this.category_id = props.category_id;
    this.name = props.name;
    this.status = props.status;
    this.type = props.type;
    props.value && (this.value = props.value);
    props.effective_date && (this.effective_date = props.effective_date);
  }
}

export class ValidateCreateTransactionInput {
  static validate(input: CreateTransactionInput) {
    return validateSync(input);
  }
}

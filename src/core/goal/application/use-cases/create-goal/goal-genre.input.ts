import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  validateSync,
  IsNumber,
  IsDateString,
} from "class-validator";

export type CreateGoalInputConstructorProps = {
  name: string;
  description?: string | null;
  balance: number;
  end_date?: Date;
};

export class CreateGoalInput {
  @IsString()
  @IsOptional()
  description: string | null;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  balance: number;

  @IsDateString()
  @IsNotEmpty()
  end_date: Date;

  constructor(props?: CreateGoalInputConstructorProps) {
    if (!props) return;
    this.name = props.name;
    this.description = props.description ?? null;
    this.balance = props.balance;
    this.end_date = props.end_date ?? new Date();
  }
}

export class ValidateCreateGoalInput {
  static validate(input: CreateGoalInput) {
    return validateSync(input);
  }
}

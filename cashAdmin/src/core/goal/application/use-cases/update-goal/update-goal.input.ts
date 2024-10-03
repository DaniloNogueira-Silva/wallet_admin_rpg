import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  IsUUID,
  validateSync,
  IsDateString,
  IsNumber,
} from "class-validator";

export type UpdateGoalInputConstructorProps = {
  id: string;
  name?: string;
  description?: string;
  balance?: number;
  end_date?: Date;
};

export class UpdateGoalInput {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  balance?: number;

  @IsDateString()
  @IsOptional()
  end_date?: Date;

  constructor(props?: UpdateGoalInputConstructorProps) {
    if (!props) return;
    this.id = props.id;
    props.name && (this.name = props.name);
    props.description && (this.description = props.description);
    props.balance && (this.balance = props.balance);
    props.end_date && (this.end_date = props.end_date);
  }
}

export class ValidateUpdateGoalInput {
  static validate(input: UpdateGoalInput) {
    return validateSync(input);
  }
}

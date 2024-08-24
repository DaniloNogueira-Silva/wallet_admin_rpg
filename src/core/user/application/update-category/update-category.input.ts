import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  validateSync,
} from "class-validator";

export type UpdateUserInputConstructorProps = {
  id: string;
  name?: string;
  email?: string;
  password?: string;
};

export class UpdateUserInput {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  constructor(props?: UpdateUserInputConstructorProps) {
    if (!props) return;
    this.id = props.id;
    props.name && (this.name = props.name);
    props.email && (this.email = props.email);
    props.password && (this.password = props.password);
  }
}

export class ValidateUpdateUserInput {
  static validate(input: UpdateUserInput) {
    return validateSync(input);
  }
}

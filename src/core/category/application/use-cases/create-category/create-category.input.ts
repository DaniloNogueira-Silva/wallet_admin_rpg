import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

export type CreateCategoryInputConstructorProps = {
  name: string;
};

export class CreateCategoryInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  constructor(props: CreateCategoryInputConstructorProps) {
    if (!props) return;
    this.name = props.name;
  }
}

export class ValidateCreateCategoryInput {
  static validate(input: CreateCategoryInput) {
    return validateSync(input);
  }
}

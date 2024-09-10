import { UpdateUserInput } from "src/core/user/application/update-user/update-user.input";
import { OmitType } from "@nestjs/mapped-types";

export class UpdateUserInputWithoutId extends OmitType(UpdateUserInput, [
  "id",
] as const) {}

export class UpdateUserDto extends UpdateUserInputWithoutId {}

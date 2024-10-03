import { OmitType } from "@nestjs/mapped-types";
import { UpdateUserInput } from "../../../core/user/application/update-user/update-user.input";

export class UpdateUserInputWithoutId extends OmitType(UpdateUserInput, [
  "id",
] as const) {}

export class UpdateUserDto extends UpdateUserInputWithoutId {}

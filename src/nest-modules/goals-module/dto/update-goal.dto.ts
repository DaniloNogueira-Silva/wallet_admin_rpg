import { OmitType } from "@nestjs/mapped-types";
import { UpdateGoalInput } from "../../../core/goal/application/use-cases/update-goal/update-goal.input";

export class UpdateGoalInputWithoutId extends OmitType(UpdateGoalInput, [
  "id",
] as const) {}

export class UpdateGoalDto extends UpdateGoalInputWithoutId {}

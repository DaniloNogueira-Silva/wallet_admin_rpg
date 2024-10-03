import { SearchInput } from "../../../../shared/application/search-input";
import { SortDirection } from "../../../../shared/domain/repository/search-params";
import { ValidateNested, validateSync } from "class-validator";

export class ListGoalFilter {
  name?: string;
}

export class ListGoalInput implements SearchInput<ListGoalFilter> {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  @ValidateNested()
  filter?: ListGoalFilter;
}

export class ValidateListGoalInput {
  static validate(input: ListGoalInput) {
    return validateSync(input);
  }
}

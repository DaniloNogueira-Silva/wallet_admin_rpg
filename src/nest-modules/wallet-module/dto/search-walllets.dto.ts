import { ListWalletsInput } from "@core/wallet/application/use-cases/list-wallets/list-wallets.use-case";
import { SortDirection } from "../../../core/shared/domain/repository/search-params";

export class SearchWalletsDto implements ListWalletsInput {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: string;
}

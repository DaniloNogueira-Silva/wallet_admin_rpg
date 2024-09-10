import {
  IRepository,
  ISearchableRepository,
} from "src/core/shared/domain/repository/repository-interface";
import { User } from "./user.aggregate";
import { Uuid } from "src/core/shared/domain/value-objects/uuid.vo";
import { SearchParams } from "src/core/shared/domain/repository/search-params";
import { SearchResult } from "src/core/shared/domain/repository/search-result";

export type UserFilter = string;

export class UserSearchParams extends SearchParams<UserFilter> {}
export class UserSearchResult extends SearchResult<User> {}

export interface IUserRepository
  extends ISearchableRepository<
    User,
    Uuid,
    UserFilter,
    UserSearchParams,
    UserSearchResult
  > {}

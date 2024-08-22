import {
  IRepository,
  ISearchableRepository,
} from "@core/shared/domain/repository/repository-interface";
import { User } from "./user.aggregate";
import { Uuid } from "@core/shared/domain/value-objects/uuid.vo";
import { SearchParams } from "@core/shared/domain/repository/search-params";
import { SearchResult } from "@core/shared/domain/repository/search-result";

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

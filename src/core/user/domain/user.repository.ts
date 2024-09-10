import {
  IRepository,
  ISearchableRepository,
} from "../../shared/domain/repository/repository-interface";
import { User } from "./user.aggregate";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { SearchParams } from "../../shared/domain/repository/search-params";
import { SearchResult } from "../../shared/domain/repository/search-result";

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

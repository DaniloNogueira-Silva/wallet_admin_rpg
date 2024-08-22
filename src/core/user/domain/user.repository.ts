import { IRepository } from "@core/shared/domain/repository/repository-interface";
import { User } from "./user.aggregate";
import { Uuid } from "@core/shared/domain/value-objects/uuid.vo";

export interface IUserRepository extends IRepository<User, Uuid> {}

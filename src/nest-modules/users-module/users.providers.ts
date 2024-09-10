import { getModelToken } from "@nestjs/sequelize";
import { UserInMemoryRepository } from "../../core/user/infra/db/in-memory/user-in-memory.repository";
import { UserModel } from "../../core/user/infra/db/sequelize/user.model";
import { IUserRepository } from "../../core/user/domain/user.repository";
import { UserIdExistsInDatabaseValidator } from "src/core/user/application/validations/users-ids-exists-in-database.validator";
import { UserSequelizeRepository } from "src/core/user/infra/db/sequelize/user-sequelize-repository";
import { CreateUserUseCase } from "src/core/user/application/create-user/create-user.use-case";
import { UpdateUserUseCase } from "src/core/user/application/update-user/update-user.use-case";
import { ListUserUseCase } from "src/core/user/application/list-user/list-user.use-case";
import { GetUserUseCase } from "src/core/user/application/get-user/get-user.use-case";
import { DeleteUserUseCase } from "src/core/user/application/delete-user/delete-user.use-case";

export const REPOSITORIES = {
  USER_REPOSITORY: {
    provide: "UserRepository",
    useExisting: UserSequelizeRepository,
  },
  USER_IN_MEMORY_REPOSITORY: {
    provide: UserInMemoryRepository,
    useClass: UserInMemoryRepository,
  },
  USER_SEQUELIZE_REPOSITORY: {
    provide: UserSequelizeRepository,
    useFactory: (userModel: typeof UserModel) => {
      return new UserSequelizeRepository(userModel);
    },
    inject: [getModelToken(UserModel)],
  },
};

export const USE_CASES = {
  CREATE_USER_USE_CASE: {
    provide: CreateUserUseCase,
    useFactory: (userRepo: IUserRepository) => {
      return new CreateUserUseCase(userRepo);
    },
    inject: [REPOSITORIES.USER_REPOSITORY.provide],
  },
  UPDATE_USER_USE_CASE: {
    provide: UpdateUserUseCase,
    useFactory: (userRepo: IUserRepository) => {
      return new UpdateUserUseCase(userRepo);
    },
    inject: [REPOSITORIES.USER_REPOSITORY.provide],
  },
  LIST_USERS_USE_CASE: {
    provide: ListUserUseCase,
    useFactory: (userRepo: IUserRepository) => {
      return new ListUserUseCase(userRepo);
    },
    inject: [REPOSITORIES.USER_REPOSITORY.provide],
  },
  GET_USER_USE_CASE: {
    provide: GetUserUseCase,
    useFactory: (userRepo: IUserRepository) => {
      return new GetUserUseCase(userRepo);
    },
    inject: [REPOSITORIES.USER_REPOSITORY.provide],
  },
  DELETE_USER_USE_CASE: {
    provide: DeleteUserUseCase,
    useFactory: (userRepo: IUserRepository) => {
      return new DeleteUserUseCase(userRepo);
    },
    inject: [REPOSITORIES.USER_REPOSITORY.provide],
  },
};

export const VALIDATIONS = {
  USERS_IDS_EXISTS_IN_DATABASE_VALIDATOR: {
    provide: UserIdExistsInDatabaseValidator,
    useFactory: (userRepo: IUserRepository) => {
      return new UserIdExistsInDatabaseValidator(userRepo);
    },
    inject: [REPOSITORIES.USER_REPOSITORY.provide],
  },
};

export const USER_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
  VALIDATIONS,
};

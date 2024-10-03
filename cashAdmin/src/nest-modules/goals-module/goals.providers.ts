import { getModelToken } from "@nestjs/sequelize";
import { CreateGoalUseCase } from "../../core/goal/application/use-cases/create-goal/create-goal.use-case";
import { GoalSequelizeRepository } from "../../core/goal/infra/db/sequelize/goal-sequelize.repository";
import { IGoalRepository } from "../../core/goal/domain/goal.repository";
import { UpdateGoalUseCase } from "../../core/goal/application/use-cases/update-goal/update-goal.use-case";
import { GetGoalUseCase } from "../../core/goal/application/use-cases/get-goal/get-goal.use-case";
import { GoalModel } from "src/core/goal/infra/db/sequelize/goal-model";
import { ListGoalsUseCase } from "src/core/goal/application/use-cases/list-goal/list-goals.use-case";
import { GoalIdExistsInDatabaseValidator } from "src/core/goal/application/validations/goals-ids-exists-in-database.validator";
import { DeleteGoalUseCase } from "src/core/goal/application/use-cases/delete-goal/delete-genre.use-case";
import { IUnitOfWork } from "src/core/shared/domain/unit-of-work.interface";
import { GoalInMemoryRepository } from "src/core/goal/infra/db/in-memory/goal-in-memory.repository";

export const REPOSITORIES = {
  GOAL_REPOSITORY: {
    provide: "GoalRepository",
    useExisting: GoalSequelizeRepository,
  },
  GOAL_IN_MEMORY_REPOSITORY: {
    provide: GoalInMemoryRepository,
    useClass: GoalInMemoryRepository,
  },
  GOAL_SEQUELIZE_REPOSITORY: {
    provide: GoalSequelizeRepository,
    useFactory: (goalModel: typeof GoalModel) => {
      return new GoalSequelizeRepository(goalModel);
    },
    inject: [getModelToken(GoalModel)],
  },
};

export const USE_CASES = {
  CREATE_GOAL_USE_CASE: {
    provide: CreateGoalUseCase,
    useFactory: (goalRepo: IGoalRepository) => {
      return new CreateGoalUseCase(goalRepo);
    },
    inject: [REPOSITORIES.GOAL_REPOSITORY.provide],
  },
  UPDATE_GOAL_USE_CASE: {
    provide: UpdateGoalUseCase,
    useFactory: (goalRepo: IGoalRepository, uow: IUnitOfWork) => {
      return new UpdateGoalUseCase(uow, goalRepo);
    },
    inject: [REPOSITORIES.GOAL_REPOSITORY.provide],
  },
  LIST_GOALS_USE_CASE: {
    provide: ListGoalsUseCase,
    useFactory: (goalRepo: IGoalRepository) => {
      return new ListGoalsUseCase(goalRepo);
    },
    inject: [REPOSITORIES.GOAL_REPOSITORY.provide],
  },
  GET_GOAL_USE_CASE: {
    provide: GetGoalUseCase,
    useFactory: (goalRepo: IGoalRepository) => {
      return new GetGoalUseCase(goalRepo);
    },
    inject: [REPOSITORIES.GOAL_REPOSITORY.provide],
  },
  DELETE_GOAL_USE_CASE: {
    provide: DeleteGoalUseCase,
    useFactory: (goalRepo: IGoalRepository, uow: IUnitOfWork) => {
      return new DeleteGoalUseCase(uow, goalRepo);
    },
    inject: [REPOSITORIES.GOAL_REPOSITORY.provide],
  },
};

export const VALIDATIONS = {
  GOALS_IDS_EXISTS_IN_DATABASE_VALIDATOR: {
    provide: GoalIdExistsInDatabaseValidator,
    useFactory: (goalRepo: IGoalRepository) => {
      return new GoalIdExistsInDatabaseValidator(goalRepo);
    },
    inject: [REPOSITORIES.GOAL_REPOSITORY.provide],
  },
};

export const GOAL_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
  VALIDATIONS,
};

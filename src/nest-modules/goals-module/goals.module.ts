import { Module } from '@nestjs/common';
import { GoalsController } from './goals.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { GOAL_PROVIDERS } from './goals.providers';
import { GoalModel } from 'src/core/goal/infra/db/sequelize/goal-model';

@Module({
  imports: [SequelizeModule.forFeature([GoalModel])],
  controllers: [GoalsController],
  providers: [
    ...Object.values(GOAL_PROVIDERS.REPOSITORIES),
    ...Object.values(GOAL_PROVIDERS.USE_CASES),
    ...Object.values(GOAL_PROVIDERS.VALIDATIONS),
  ],
  exports: [
    GOAL_PROVIDERS.REPOSITORIES.GOAL_REPOSITORY.provide,
    GOAL_PROVIDERS.VALIDATIONS.GOALS_IDS_EXISTS_IN_DATABASE_VALIDATOR
      .provide,
  ],
})
export class GoalsModule {}

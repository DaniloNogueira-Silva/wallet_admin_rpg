import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModel } from "../../core/user/infra/db/sequelize/user.model";
import { USER_PROVIDERS } from "./users.providers";

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  controllers: [UsersController],
  providers: [
    ...Object.values(USER_PROVIDERS.REPOSITORIES),
    ...Object.values(USER_PROVIDERS.USE_CASES),
    ...Object.values(USER_PROVIDERS.VALIDATIONS),
  ],
  exports: [
    USER_PROVIDERS.REPOSITORIES.USER_REPOSITORY.provide,
    USER_PROVIDERS.VALIDATIONS.USERS_IDS_EXISTS_IN_DATABASE_VALIDATOR.provide,
  ],
})
export class UsersModule {}

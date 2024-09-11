import { Module } from "@nestjs/common";
import { ConfigModule } from "./nest-modules/config-module/config.module";
import { SharedModule } from "./nest-modules/shared-module/shared.module";
import { DatabaseModule } from "./nest-modules/database-module/database.module";
import { UsersModule } from "./nest-modules/users-module/users.module";
import { CategoriesModule } from "./nest-modules/categories-module/categories.module";
import { WalletsModule } from "./nest-modules/wallet-module/wallet.module";
import { GoalsModule } from "./nest-modules/goals-module/goals.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    SharedModule,
    DatabaseModule,
    UsersModule,
    WalletsModule,
    CategoriesModule,
    GoalsModule
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}

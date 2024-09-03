import { Module } from "@nestjs/common";
import { ConfigModule } from "./nest-modules/config-module/config.module";
import { SharedModule } from "./nest-modules/shared-module/shared.module";
import { DatabaseModule } from "./nest-modules/database-module/database.module";
import { UsersModule } from "./nest-modules/users-module/users.module";
import { WalletsModule } from "./nest-modules/wallet-module/walllet.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    SharedModule,
    DatabaseModule,
    UsersModule,
    WalletsModule
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { applyGlobalConfig } from "./nest-modules/global-config";
import 'mysql2';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: process.env.NODE_ENV === "development" ? console : undefined,
  });
  await app.listen(3000);

  applyGlobalConfig(app);

}
export default bootstrap();

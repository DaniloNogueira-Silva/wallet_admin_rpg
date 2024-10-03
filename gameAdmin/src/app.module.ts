import { Module } from '@nestjs/common';
import { characterModule } from './character/character.module';

@Module({
  imports: [characterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

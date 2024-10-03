import { Module } from '@nestjs/common';
import { characterService } from './useCases/character.useCase';
import { characterController } from './character.controller';

@Module({
  controllers: [characterController],
  providers: [characterService],
})
export class characterModule {}

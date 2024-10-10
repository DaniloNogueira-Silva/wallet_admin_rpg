import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Character } from './entities/character.entity';
import { CharacterController } from './endpoint/character.controller';
import { CharacterService } from './services/character.service';

@Module({
  imports: [SequelizeModule.forFeature([Character])],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}

import { Module } from '@nestjs/common';
import { CharacterModule } from 'src/character/character.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule, // O módulo de banco de dados que criamos
    CharacterModule, // Outros módulos como o CharacterModule
  ],
})
export class AppModule {}

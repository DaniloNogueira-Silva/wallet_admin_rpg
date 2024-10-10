import { PartialType } from '@nestjs/mapped-types';
import { CreateCharacterDto } from './create-character.dto';

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {
  name: string;
  genre: string;
  level: number;
  health: number;
  stamina: number;
}

import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from '../dto/create-character.dto';
import { UpdateCharacterDto } from '../dto/update-character.dto';

@Injectable()
export class characterService {
  create(createcharacterDto: CreateCharacterDto) {
    return 'This action adds a new character';
  }

  findAll() {
    return `This action returns all character`;
  }

  findOne(id: number) {
    return `This action returns a #${id} character`;
  }

  update(id: number, updatecharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}

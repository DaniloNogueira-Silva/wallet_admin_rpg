import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Character } from '../entities/character.entity';
import { CreateCharacterDto } from '../dto/create-character.dto';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character)
    private readonly characterModel: typeof Character,
  ) {}

  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    const character = new Character({
      ...createCharacterDto,
      character_id: undefined, // Sequelize irá gerar automaticamente
    });
    return character.save();
  }

  async findOne(id: string): Promise<Character> {
    const character = await this.characterModel.findByPk(id);
    if (!character) {
      throw new NotFoundException('Character not found');
    }
    return character;
  }

  async levelUp(id: string): Promise<Character> {
    const character = await this.findOne(id);
    character.level += 1;
    return character.save();
  }
}

import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { CreateCharacterDto } from '../dto/create-character.dto';
import { CharacterService } from '../services/character.service';

@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  async create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.characterService.findOne(id);
  }

  @Patch(':id/levelUp')
  async levelUp(@Param('id') id: string) {
    return this.characterService.levelUp(id);
  }
}

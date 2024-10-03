import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { characterService } from './useCases/character.useCase';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Controller('character')
export class characterController {
  constructor(private readonly characterService: characterService) {}

  @Post()
  create(@Body() createcharacterDto: CreateCharacterDto) {
    return this.characterService.create(createcharacterDto);
  }

  @Get()
  findAll() {
    return this.characterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.characterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatecharacterDto: UpdateCharacterDto) {
    return this.characterService.update(+id, updatecharacterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.characterService.remove(+id);
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { characterController } from './character.controller';
import { characterService } from '../useCases/character.useCase';

describe('characterController', () => {
  let controller: characterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [characterController],
      providers: [characterService],
    }).compile();

    controller = module.get<characterController>(characterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

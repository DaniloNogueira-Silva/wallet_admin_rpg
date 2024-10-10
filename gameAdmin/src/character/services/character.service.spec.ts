import { Test, TestingModule } from '@nestjs/testing';
import { characterService } from './character.service';

describe('characterService', () => {
  let service: characterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [characterService],
    }).compile();

    service = module.get<characterService>(characterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

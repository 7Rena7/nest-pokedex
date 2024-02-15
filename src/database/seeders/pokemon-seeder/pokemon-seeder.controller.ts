import { Controller, Post, Query } from '@nestjs/common';
import { ParseSeedAmountPipe } from 'src/common/pipes/parse-seed-amount/parse-seed-amount.pipe';
import { PokemonSeedService } from './pokemon-seeder.servce';

@Controller('seed')
export class PokemonSeedController {
  constructor(private readonly seedService: PokemonSeedService) {}

  @Post()
  populateDatabase(@Query('amount', ParseSeedAmountPipe) amount: number) {
    return this.seedService.populateDatabase(amount);
  }
}

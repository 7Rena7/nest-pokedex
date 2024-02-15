import { Controller, Post, Query } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ParseSeedAmountPipe } from 'src/common/pipes/parse-seed-amount/parse-seed-amount.pipe';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  populateDatabase(@Query('amount', ParseSeedAmountPipe) amount: number) {
    return this.seedService.populateDatabase(amount);
  }
}

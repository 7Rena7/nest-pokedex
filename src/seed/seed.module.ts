import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokeApiFetchAdapter } from 'src/common/helpers/pokeapi.adapter';

@Module({
  controllers: [SeedController],
  providers: [SeedService, PokeApiFetchAdapter],
})
export class SeedModule {}

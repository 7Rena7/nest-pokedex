import { Module } from '@nestjs/common';
import { PokemonSeederModule } from './pokemon-seeder/pokemon-seeder.module';

@Module({
  controllers: [],
  providers: [],
  imports: [PokemonSeederModule],
  exports: [PokemonSeederModule],
})
export class SeedModule {}

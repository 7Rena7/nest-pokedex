import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokeApiFetchAdapter } from 'src/common/helpers/pokeapi.adapter';
import { PokemonModule } from 'src/pokemon/pokemon.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService, PokeApiFetchAdapter],
  imports: [PokemonModule],
})
export class SeedModule {}

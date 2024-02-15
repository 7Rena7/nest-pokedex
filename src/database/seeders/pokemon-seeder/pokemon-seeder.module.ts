import { Module } from '@nestjs/common';
import { PokeApiFetchAdapter } from 'src/common/helpers/adapters/pokeapi.adapter';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { PokemonSeedController } from './pokemon-seeder.controller';
import { PokemonSeedService } from './pokemon-seeder.servce';

@Module({
  controllers: [PokemonSeedController],
  providers: [PokemonSeedService, PokeApiFetchAdapter],
  imports: [PokemonModule],
})
export class PokemonSeederModule {}

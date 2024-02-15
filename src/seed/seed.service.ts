import { Injectable } from '@nestjs/common';
import { PokeApiFetchAdapter } from 'src/common/helpers/pokeapi.adapter';
import { PokeAPIResponse } from 'src/models/pokeapi/interfaces/pokeapi-response.interface';

@Injectable()
export class SeedService {
  constructor(private pokeApi: PokeApiFetchAdapter) {}

  async populateDatabase() {
    const result = await this.pokeApi.get<PokeAPIResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=100',
    );

    const pokemons = [];

    for (const { name, url } of result.results) {
      const splitted = url.split('/');
      const no = parseInt(splitted.at(-2));
      pokemons.push({
        name,
        no,
      });
    }

    return pokemons;
  }
}

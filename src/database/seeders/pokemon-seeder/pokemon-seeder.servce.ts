import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PokeApiFetchAdapter } from 'src/common/helpers/adapters/pokeapi.adapter';
import { PokeAPIResponse } from 'src/models/pokeapi/interfaces/pokeapi-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class PokemonSeedService {
  constructor(
    private readonly pokeApi: PokeApiFetchAdapter,
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async populateDatabase(amount: number) {
    await this.pokemonModel.deleteMany({});

    const resp = await this.pokeApi.get<PokeAPIResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=${amount}`,
    );

    const pokemonsToInsert: { name: string; no: number }[] = [];

    for (const { name, url } of resp.results) {
      const splitted = url.split('/');
      const no = +splitted.at(-2);

      pokemonsToInsert.push({
        name,
        no,
      });
    }

    await this.pokemonModel.insertMany(pokemonsToInsert);
    return 'Seed executed';
  }
}

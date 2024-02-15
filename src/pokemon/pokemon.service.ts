import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { Model, isValidObjectId } from 'mongoose';
import { MongoErrors } from 'src/common/enums/errors';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto.name = createPokemonDto.name.toLowerCase();
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 10, offset = 0 } = paginationDto;

      const promiseArr = [
        this.pokemonModel.countDocuments(),
        this.pokemonModel
          .find()
          .skip(offset)
          .limit(limit)
          .sort({ no: 1 })
          .select('-__v'),
      ];

      const [count, data] = await Promise.all(promiseArr);

      const BASE_URL = 'http://localhost:3000/api/v2/pokemon';

      const next = `${BASE_URL}?limit=${limit}&offset=${offset + limit}`;
      const previous =
        offset - limit >= 0
          ? `${BASE_URL}?limit=${limit}&offset=${offset - limit}`
          : null;

      return {
        count,
        next,
        previous,
        data,
      };
    } catch (error) {
      this.handleException(error);
    }
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if (!isNaN(+term)) pokemon = await this.pokemonModel.findOne({ no: +term });

    if (isValidObjectId(term)) pokemon = await this.pokemonModel.findById(term);

    if (!pokemon)
      pokemon = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      });

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, name or no '${term}' not found`,
      );

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne(term);
      if (updatePokemonDto.name)
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    const { deletedCount, acknowledged } = await this.pokemonModel.deleteOne({
      _id: id,
    });
    if (deletedCount === 0 && acknowledged)
      throw new BadRequestException(`Pokemon with id '${id}' doesn't exist`);
  }

  private handleException(error: any) {
    switch (error.code) {
      case MongoErrors.DUPLICATE_KEY:
        throw new BadRequestException(
          `Pokemon with fields ${JSON.stringify(error.keyValue)} already exists`,
        );
      default:
        console.error(error);
        throw new InternalServerErrorException(
          `Couldn't complete operation - Check server logs for more details`,
        );
    }
  }
}

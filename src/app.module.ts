import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './database/seeders/seed.module';
import { EnvConfiguration } from './config/app/app.config';
import { validationSchema } from './config/app/schema.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: validationSchema,
    }),

    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),

    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING, {
      dbName: process.env.MONGO_DATABASE_NAME,
    }),

    PokemonModule,

    CommonModule,

    SeedModule,
  ],
})
export class AppModule {}

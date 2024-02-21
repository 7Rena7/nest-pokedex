<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Prepare Dev Mode

1. Clone repository.
2. Run `npm install` to install all dependencies.

```bash
$ npm install
```

3. Install nestjs cli globally if you don't have it.

```bash
$ npm install -g @nestjs/cli
```

4. Create local database

```bash
$ docker-compose up -d
```

5. Clone **.env.template** file to **.env**.

```bash
$ cp .env.template .env
```

6. Set environment variables in **.env** file.

7. Run application

```bash
$ npm run start:dev
```

8. Run seed

```bash
$ cURL -X POST http://localhost:3000/api/v2/seed?amount=600
```

#### NOTE: amount is the number of pokemons to be created. It's optional and the default value is 100.

<!-- ## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
``` -->

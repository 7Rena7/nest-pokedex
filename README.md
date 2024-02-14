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

## Running the app

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
```


## Descrição

- API criada utilizando o framework [NestJS](https://github.com/nestjs/nest)
- Os dados retornados são originários da api não oficial da spaceX (https://github.com/r-spacex/SpaceX-API)
- Serve como _backend for frontend_ para o frontend criado em https://github.com/mateusdeitos/spacex-frontend
- Utiliza [caching in memory](https://docs.nestjs.com/techniques/caching#in-memory-cache) com o modulo de cache do NestJS

## Como rodar

- Clone o repositório
- Crie o arquivo `.env` com base no arquivo `.env.example`
- Instale as dependências `npm install` ou `yarn`
- Comandos:

```bash
# development (rodar yarn build antes)
$ yarn start

# modo watch
$ yarn start:dev

# modo produção
$ yarn start:prod
```

## Testes

```bash
# testes unitários
$ yarn test

# test coverage
$ yarn test:cov
```

## Futuras melhorias

- [] Containerizar o app para facilitar o desenvolvimento independente do ambiente
- [] Rate limiter

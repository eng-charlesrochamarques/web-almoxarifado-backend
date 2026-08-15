# Web Almoxarifado Backend

## Descricao do projeto

Web Almoxarifado Backend e a API do sistema Web Almoxarifado. Nesta etapa, o projeto implementa autenticacao, cadastro de usuarios, rotas protegidas com JWT, operacoes CRUD para itens do almoxarifado usando MongoDB e consulta protegida a API da TME.

O backend foi desenvolvido para a Etapa 2 do projeto final da TripleTen: aplicacao full-stack com Node.js, Express e MongoDB.

## Funcionalidades

- Cadastro de usuario.
- Login de usuario com JWT.
- Rota protegida para buscar o usuario atual.
- Criacao de itens do almoxarifado.
- Listagem de itens.
- Atualizacao de itens.
- Exclusao de itens.
- Protecao das rotas de itens com autenticacao.
- Bloqueio para impedir que um usuario exclua itens criados por outro usuario.
- Consulta protegida a API da TME pelo backend.
- Validacao de dados com Celebrate/Joi.
- Tratamento centralizado de erros.
- Logs de requisicoes e erros com Winston.
- Uso de variaveis de ambiente.

## Tecnologias utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Celebrate/Joi
- JSON Web Token
- bcryptjs
- dotenv
- cors
- winston
- express-winston
- ESLint
- TME API

## Rotas da API

### Rotas publicas

#### GET /

Retorna uma mensagem de status da API.

#### POST /signup

Cria um novo usuario.

Corpo da requisicao:

```json
{
  "name": "Usuario Teste",
  "email": "usuario@example.com",
  "password": "123456"
}
```

#### POST /signin

Autentica o usuario e retorna um JWT.

Corpo da requisicao:

```json
{
  "email": "usuario@example.com",
  "password": "123456"
}
```

Resposta:

```json
{
  "token": "jwt-token"
}
```

### Rotas protegidas

As rotas protegidas exigem o cabecalho:

```text
Authorization: Bearer jwt-token
```

#### GET /users/me

Retorna os dados do usuario autenticado.

#### GET /items

Retorna os itens cadastrados.

#### POST /items

Cria um item no almoxarifado.

Corpo da requisicao:

```json
{
  "name": "Timer NE555",
  "category": "Circuitos integrados",
  "partNumber": "NE555P",
  "manufacturer": "Texas Instruments",
  "location": "Gaveta A-03",
  "quantity": 25,
  "minQuantity": 10,
  "lastPrice": 0.32,
  "currency": "EUR",
  "imageUrl": ""
}
```

#### PATCH /items/:itemId

Atualiza um item existente.

#### DELETE /items/:itemId

Remove um item existente. Apenas o usuario que criou o item pode remove-lo.

#### GET /api/suppliers/tme/search

Consulta a API da TME usando credenciais protegidas no backend.

Exemplo:

```text
GET /api/suppliers/tme/search?query=NE555
```

Resposta esperada:

```json
{
  "items": [
    {
      "id": "tme-NE555P",
      "imageUrl": "",
      "supplier": "TME",
      "manufacturer": "Texas Instruments",
      "manufacturerPartNumber": "NE555P",
      "description": "Timer NE555",
      "availability": 100,
      "unitPrice": 0.32,
      "currency": "EUR",
      "productUrl": "https://www.tme.eu/..."
    }
  ]
}
```

## Codigos de erro

- `400` - Dados invalidos.
- `401` - Autorizacao necessaria ou credenciais invalidas.
- `403` - Acao proibida para o usuario atual.
- `404` - Recurso nao encontrado.
- `409` - Email ja cadastrado.
- `500` - Erro interno do servidor.

## Variaveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base em `.env.example`.

```env
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/web-almoxarifado
JWT_SECRET=replace-this-secret
TME_TOKEN=replace-this-token
TME_APPLICATION_SECRET=replace-this-secret
TME_COUNTRY=DE
TME_LANGUAGE=EN
TME_CURRENCY=EUR
```

O arquivo `.env` nao deve ser enviado ao GitHub. As credenciais reais da TME devem ficar apenas em variaveis de ambiente no servidor.

## Como executar localmente

Instale as dependencias:

```bash
npm install
```

Execute em modo de desenvolvimento:

```bash
npm run dev
```

Se estiver usando PowerShell no Windows:

```powershell
npm.cmd run dev
```

Servidor local:

```text
http://localhost:3000
```

## Scripts disponiveis

```bash
npm run start
npm run dev
npm run lint
```

## Logs

Os logs sao gerados na pasta:

```text
logs/
```

Arquivos:

```text
logs/request.log
logs/error.log
```

A pasta `logs/` e ignorada pelo Git.

## Status da Etapa 2

Implementado nesta etapa:

- Back-end com Node.js e Express.
- Banco de dados MongoDB.
- Modelos de usuario e itens do almoxarifado.
- CRUD real de itens conectado ao banco de dados.
- Cadastro e login de usuario com JWT.
- Rotas protegidas por autenticacao.
- Variaveis de ambiente para configuracoes sensiveis.
- Integracao protegida com a API da TME.
- Logs de requisicoes e erros.

Planejado para a Etapa 3:

- Conexao completa do front-end com o back-end.
- Deploy full-stack com HTTPS.
- Atualizacao do README com o dominio da API implantada.
- Refatoracao do componente Search.jsx do front-end em componentes menores, conforme sugestao da revisao da Etapa 1.

## Deploy

O deploy completo sera realizado na Etapa 3, quando o front-end for conectado ao back-end e a aplicacao full-stack for implantada em servidor com HTTPS.

Nesta Etapa 2, o backend foi desenvolvido e testado localmente, com rotas protegidas, MongoDB, autenticacao JWT, logs e integracao segura com a API da TME.

Dominio da API:

```text
A ser adicionado na Etapa 3.
```

## Branch da etapa

```text
stage-backend
```

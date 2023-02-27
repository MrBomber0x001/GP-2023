# Intro

## Techs

- `Node/Express` API Server
- Render => Hosting postges db server
- Postman => API endpoints collection
- prisma => Postgres ORM
- Redis => Caching
- GCS => Google Cloud Storage

## Project structure

```
📦📦src
 ┣ 📂controllers
 ┃ ┗ 📜index.js
 ┣ 📂helpers
 ┃ ┗ 📜index.js
 ┣ 📂routes
 ┃ ┗ 📜index.js
 ┣ 📜.editorconfig
 ┗ 📜server.js
```

## Features

An overview of the GP API.

- **Authentication & Authorization**:

- **File upload**:
  - Google Cloud Storage For uploading documents and proposals files
  - Multer for managing the image upload
- **logging**:
  - Error Reporting with `Sentry`
  - Logging requests with `morgan`
  - Logging with WinstonJS
- **Error Response**:

- **Security Best Practices**:
  - Rate Limiting with Token Bucket Authentication (Redis as a Token store)
  - XSS protection
  - CORS protection
- **Coding style**:
  - Code style with prettier
  - Husky && lint-staged as a pre-commit hook to format using prettier

## Installation & Build scripts

- build

```sh
npm run build
```

## test scripts

test screenshots

## Logs

- [ ] Setup Database schema
- [ ] determine project core pages
- [ ] Projet structure && type of database [nosql/sql]
- [ ] Authentication (Eslam)
  - [ ] Signup
  - [ ] Singin
  - [ ] Forget password
- [ ] Post Feature (Shefo)
  - [x] CRUD
- [ ] Topics:
  - CORS security
  - Rate limiting
  - SSL/TLS certificates
  - How cachin goes in this situtation!
  - Are we read or write intensive ? [choosing the right index]
  - choosing the right services [deployment, storage, ci/cd]
  - linting and coding style formatting
  - contributing guidelines [x]
  - dockerfile optimization [synk]
  - the right usage of events and webSockets
  - redis and webSockets conncetion

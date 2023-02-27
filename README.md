# Intro

## Project structure

```
📦src
 ┣ 📂config
 ┃ ┣ 📜constants.js
 ┃ ┣ 📜firebase.js
 ┃ ┣ 📜logger.js
 ┃ ┣ 📜multer.js
 ┃ ┣ 📜redis.js
 ┃ ┗ 📜sendGrid.js
 ┣ 📂controllers
 ┃ ┣ 📜auth.controller.js
 ┃ ┣ 📜index.js
 ┃ ┣ 📜job.controller.js
 ┃ ┣ 📜review.controller.js
 ┃ ┗ 📜user.controller.js
 ┣ 📂helpers
 ┃ ┗ 📜index.js
 ┣ 📂middlewares
 ┃ ┗ 📜jwt.js
 ┣ 📂routes
 ┃ ┣ 📂v1
 ┃ ┃ ┣ 📜auth.routes.js
 ┃ ┃ ┣ 📜job.routes.js
 ┃ ┃ ┣ 📜review.routes.js
 ┃ ┃ ┗ 📜user.routes.js
 ┃ ┗ 📜index.js
 ┣ 📂services
 ┃ ┗ 📜index.js
 ┗ 📂validations
 ┣ 📜.dockerignore
 ┣ 📜.editorconfig
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜Dockerfile
 ┣ 📜env.example
 ┣ 📜index.js
 ┣ 📜Makefile
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┗ 📜server.js
```

## DB

<a href="https://dbdiagram.io/d/63fa4cfd296d97641d83b6c3">DB Schema</a>

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

## test scripts

test screenshots

## Contributions

## Resources

## Tools

- Render => postgres
- Postman
- prisma => postgres

## Logs

- [ ] Setup Database schema
- [ ] determine project core pages
- [x] Project structure && type of database [nosql/sql]
- [ ] Async wrapper
- [ ] How migrations in teams work
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

USER: - create account as client or applicant
ROLES: [CLIENT, APPLICANT]
APPLICANT

Functional requirements For every entity
CLIENT can do:
    1. Create acount
    2. Create a jop post
    3. Search for applicant based on thier title
    4. Filter by (location,category)
    4. Filter by most rated applicant
APPLICANT can do:
    1. Create acount
    2. Propose for a job
    3. Explore available jobs
    4. Filter by category
    5. acheivments
    6. Reviews
    7. Can comment on job post (edit , delete)
ADMIN can do:
    1. Manage category
    2. Manage user(Client,Applicant) account
    3. Manage posts
PAGES:
    1. Onboarding
    2. Job posting
    3. Homepage
    4. profile
    5. User settings

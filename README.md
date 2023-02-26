# Intro

1.

2.

3.

Don't ever mergin into main/master before doing a pull!

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

/\*

- don't ever push into main
- dont' ever push into develop [finish feature_branch => review (done) => merge into develop]
- code documented

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

---

DATA:
Job:

1. Title -m
2. Pricing -o
4. Category -m
5. Attachments(files , photos , ...) -o
6. Desc -m
Proposal:
1. Comment
User:
1. Username -m
2. E-mail -m
3. Password -m
4. Address -m
5. Photo -o
6. Contact -m
7. Bio -m
8. WorkExp -o
9. Role -m
Review:
1. Rate -m
2. Desc -o

prototype!

Authentication => registered
onboarding

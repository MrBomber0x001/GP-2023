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

-   **Authentication & Authorization**:

-   **File upload**:
    -   Google Cloud Storage For uploading documents and proposals files
    -   Multer for managing the image upload
-   **logging**:
    -   Error Reporting with `Sentry`
    -   Logging requests with `morgan`
    -   Logging with WinstonJS
-   **Error Response**:

-   **Security Best Practices**:
    -   Rate Limiting with Token Bucket Authentication (Redis as a Token store)
    -   XSS protection
    -   CORS protection
-   **Coding style**:
    -   Code style with prettier
    -   Husky && lint-staged as a pre-commit hook to format using prettier

## Installation & Build scripts

## test scripts

test screenshots

## Contributions

## Resources

## Tools

-   Render => postgres
-   Mongo Cloud Atlas => mongo
-   Postman

## Logs

-   [ ] Setup Database schema
-   [ ] determine project core pages
-   [ ] Projet structure && type of database [nosql/sql]
-   [ ] Authentication (Eslam)
    -   [ ] Signup
    -   [ ] Singin
    -   [ ] Forget password
-   [ ] Post Feature (Shefo)
    -   [x] CRUD


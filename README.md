# Intro


## Project structure

```
📦src
 ┣ 📂config
 ┃ ┣ 📜constants.js
 ┃ ┣ 📜firebase.js
 ┃ ┣ 📜logger.js
 ┃ ┣ 📜prisma.js
 ┃ ┣ 📜redis.js
 ┃ ┗ 📜sendGrid.js
 ┣ 📂controllers
 ┃ ┣ 📂admin
 ┃ ┃ ┣ 📜category.controller.js
 ┃ ┃ ┗ 📜sub-category.controller.js
 ┃ ┗ 📜auth.controller.js
 ┣ 📂error
 ┃ ┣ 📜badRequest.js
 ┃ ┣ 📜customeError.js
 ┃ ┣ 📜httpStatusCode.js
 ┃ ┣ 📜index.js
 ┃ ┣ 📜internalServerError.js
 ┃ ┣ 📜notFound.js
 ┃ ┗ 📜unAuthorizeded.js
 ┣ 📂middlewares
 ┃ ┣ 📜auth.js
 ┃ ┣ 📜errorHandler.js
 ┃ ┣ 📜notFoundMiddleware.js
 ┃ ┗ 📜uploadImage.js
 ┣ 📂public
 ┃ ┗ 📂uploads
 ┃ ┃ ┗ 📂images
 ┃ ┃ ┃ ┣ 📜image-1680239263190-748085746.jpg
 ┃ ┃ ┃ ┣ 📜image-1680239293771-11216777.jpg
 ┃ ┃ ┃ ┣ 📜image-1680239303011-688150651.jpg
 ┃ ┃ ┃ ┣ 📜image-1681200335142-220006169.jpg
 ┃ ┃ ┃ ┣ 📜shop-1681200589263-800492942.jpg
 ┃ ┃ ┃ ┣ 📜shop-1681200639950-387417493.jpg
 ┃ ┃ ┃ ┣ 📜shop-1681200702184-31193058.jpg
 ┃ ┃ ┃ ┣ 📜shop-1681201147752-299538421.jpg
 ┃ ┃ ┃ ┣ 📜shop-1681201330243-478134238.jpg
 ┃ ┃ ┃ ┣ 📜shop-1681202267626-76835129.jpg
 ┃ ┃ ┃ ┗ 📜undefined-1681200416246-991509157.jpg
 ┣ 📂routes
 ┃ ┗ 📂v1
 ┃ ┃ ┣ 📂admin
 ┃ ┃ ┃ ┣ 📜category.routes.js
 ┃ ┃ ┃ ┗ 📜sub-Category.routes.js
 ┃ ┃ ┗ 📜auth.routes.js
 ┣ 📂scripts
 ┃ ┗ 📜script.sql
 ┣ 📂utils
 ┃ ┣ 📜index.js
 ┃ ┗ 📜jwt.js
 ┣ 📂validations
 ┃ ┗ 📜auth.validation.js
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


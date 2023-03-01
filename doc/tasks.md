## tasks

- branch [`feature/auth`]:
  - [Eslam] Login - Authentication middleware (isAdmin()) - token [don't save in db]
  - [Shefo] Register - DB structure - setup prisma [you'll find the link of the db server on .env.example]
  - [] Error Handling

## notes

Done:
Eslam, move the logic of signing tokens and validating them into src/utils/jwt.js, put your secret JWT key inside .env.example

Done:
Shefo, You still haven't started yet, so begin with setup prisma you'll find the link of the db server on .env.example and use test if it's working or not

Eslam, Have you serialized user into the request object `req` because in `isAdmin()` You've used `req.user.role`?
Shefo, Move `isEmailValid` into validations folder.

## tracking

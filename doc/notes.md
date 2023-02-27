## Tracking Team work

- on branch `[feature/setup-infra]`
  - setup database server on `Render`, you will find the external link on `.env`
  - used prisma along with migrations
  - finished authentication [Signup, SignIn, ResetPassword]
  - started working on validations
  - started working on asnyc/wrapper
  - `npm install --save @sentry/node @sentry/tracing`
  - <https://meskainc.sentry.io/projects/>
  - server architecture diagram
  - setup github actions
Features:
    - Caching [Latest thing]
    - Realtime Notification [latest thing]
    - Chatting [After Caching]
    - Payment [After Chatting]

Sentry

```js
const Sentry = require("@sentry/node");
// or use es6 import statements
// import * as Sentry from '@sentry/node';

const Tracing = require("@sentry/tracing");
// or use es6 import statements
// import * as Tracing from '@sentry/tracing';

Sentry.init({
  dsn: "https://fd1ecd2c360a44f085ba2c1a48cc86a0@o4504749574258688.ingest.sentry.io/4504749575700480",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
  op: "test",
  name: "My First Test Transaction",
});

setTimeout(() => {
  try {
    foo();
  } catch (e) {
    Sentry.captureException(e);
  } finally {
    transaction.finish();
  }
}, 99);
```

The above configuration captures both error and performance data. To reduce the volume of performance data captured, change tracesSampleRate to a value between 0 and 1.

## Husky

use it with lint-staged

```sh
npm pkg set scripts.prepare="husky install"
npm run prepare

# adding new hook
npx husky add .husky/pre-commit "npm test"
git add ./husky/pre-commit


git commit -m 'Keep calm and commit'
```

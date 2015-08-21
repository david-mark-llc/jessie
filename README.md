# Jessie

## Getting started

First install the dependencies:

```bash
npm install
```

Now, start the app:

```bash
npm run local
```

## Releasing

Whenever `origin master` changes...

1. `npm run bump-patch/bump-minor/bump-major`

2. (Optional) Release on Github with a title and description of the change log.

## Deploying to Heroku

1. `npm run deploy`

2. `heroku open`
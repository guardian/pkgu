# `@guardian/pkgu`

[![npm (scoped)](https://img.shields.io/npm/v/@guardian/pkgu)](https://www.npmjs.com/package/@guardian/pkgu)

> Automatically build `@guardian` packages for publishing to NPM inline with [our recommendations](https://github.com/guardian/recommendations/blob/master/npm-packages.md).

## Installation

[![Generic badge](https://img.shields.io/badge/google-chat-259082.svg)](https://chat.google.com/room/AAAAWwBdSMs)

```bash
yarn add -D @guardian/pkgu
```

or

```bash
npm install -D @guardian/pkgu
```

## Usage

`@guardian/pkgu` installs a CLI tool called `pkgu` that you can use to create your build:

```js
// package.json
{
    ...,
    "scripts": {
        "prebuild": "rm -rf dist",
        "build": "pkgu build"
    },
    ...,
}
```

Then run `yarn build`/`npm run build` and fix anything that `pkgu` prompts you to until it builds successfully.

You should then be good to publish.

## Requirements

-   Your source code is written in TypeScript.
-   The source code lives in `src`.

_This is now archived. It didn't prove useful enough to maintain (almost no one is using it). If anyone ever wants to unarchive it, go for it!_

# `@guardian/pkgu`

<img src="https://user-images.githubusercontent.com/867233/118273242-9f558c80-b4bb-11eb-92f5-d1c2b9b8079b.png" height="191" alt="pikachu box">

> Automatically build `@guardian` packages for publishing to NPM inline with [our recommendations](https://github.com/guardian/recommendations/blob/master/npm-packages.md).

[![npm (scoped)](https://img.shields.io/npm/v/@guardian/pkgu)](https://www.npmjs.com/package/@guardian/pkgu)

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

`@guardian/pkgu` installs a CLI tool called `pkgu` that you can use to create your build.

### Commands

#### `build`

##### Example

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

This will compile your project to a `dist` directory ready for publishing, performing the following steps:

1. Lint your `package.json` and `tsconfig.json` files and update/add/remove any fields as necessary.
2. Compile 3 versions of your project:
    1. CommonJS version targetting ES2018 (for Node 10+).
    2. ESM version targetting ES2020 for use by bundlers (see [Using `@guardian` NPM packages](https://github.com/guardian/recommendations/blob/master/npm-packages.md#using-guardian-npm-packages) in the recommendations for more info).
    3. TypeScript declaration files.
3. Check that the build artefacts match the `package.json` config.
4. If your package provides a CLI it will set the permissions needed to make it executable.

You should then be good to publish.

## Requirements

-   Your source code is written in TypeScript.
-   The source code lives in a directory called `src` at the package root level.
-   There is one entry point: `src/index.ts`.

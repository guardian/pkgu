#!/usr/bin/env bash

echo ""
echo "Compiling the project..."
rm -rf .test
yarn build
mv dist .test

echo ""
echo "Compiling the project with its own build..."
./.test/cjs/index.js

echo ""
echo "Diffing the builds..."
diff --brief --recursive .test dist && echo "The builds are identical. The project builds itself correctly." || echo "The project does not build itself correctly."

#!/usr/bin/env bash

rm -rf .test

echo ""
echo "Compiling the project..."
yarn -s build
mv dist .test

echo ""
echo "Compiling the project with its own build..."
./.test/cjs/index.js

echo ""
echo "Diffing the builds..."

echo ""
diff --brief --recursive .test dist && echo "The builds are identical. The project builds itself correctly." || echo "The project does not build itself correctly."

#!/bin/bash

CURRENT_DIR_PATH="."

cd ./apps/api
npx ts-node --project ./tsconfig.gen-gql-schema.json ./src/generate-schema.ts
cd ../..

#!/bin/bash

yarn run nx run api:generate-gql-schema
yarn run nx run data-access:generate

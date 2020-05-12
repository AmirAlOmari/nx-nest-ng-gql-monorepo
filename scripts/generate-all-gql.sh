#!/bin/bash

nx run api:generate-gql-schema
nx run data-access:generate

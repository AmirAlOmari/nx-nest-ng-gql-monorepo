import { NestFactory } from '@nestjs/core';
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';
import { printSchema } from 'graphql';
import { writeFileSync } from 'fs';
import { join } from 'path';

import { findAllResolvers } from './resolvers';

async function generateSchema() {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const resolvers = findAllResolvers();
  const schema = await gqlSchemaFactory.create(resolvers);

  const printedSchema = printSchema(schema);

  writeFileSync(join(__dirname, './app/schema.gql'), printedSchema);

  console.log();
  console.log('GQL SCHEMA:');
  console.log(printedSchema);
}

generateSchema();

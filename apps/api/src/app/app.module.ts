import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypegooseModule } from 'nestjs-typegoose';
import { join } from 'path';

import { ConfigModule } from './modules/config/config.module';
import { UsersModule } from './modules/users/users.module';

import { ConfigService } from './modules/config/services/config/config.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(__dirname, './schema.gql')
    }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true
      }),
      inject: [ConfigService]
    }),

    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypegooseModule } from 'nestjs-typegoose';
import { join } from 'path';

import { ConfigModule } from './modules/config/config.module';
import { SharedModule } from './modules/shared/shared.module';
import { JwtModule } from './modules/jwt/jwt.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TasksModule } from './modules/tasks/tasks.module';

import { ConfigService } from './modules/config/services/config/config.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(__dirname, './schema.gql'),
      // context: (c: any) => c
      introspection: true,
      playground: true,
      debug: true,
      tracing: true,
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

    JwtModule,
    SharedModule,
    UsersModule,
    AuthModule,
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

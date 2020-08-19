import { Logger } from '@nestjs/common';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';

import { ConfigService } from './app/modules/config/services/config/config.service';
import { LoggerService } from './app/modules/common/services/logger/logger.service';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Eject app providers
  const { httpServer } = await app.get(HttpAdapterHost);
  const cs = await app.get(ConfigService);
  const ls = await app.resolve(LoggerService);

  // Setup ejected providers
  ls.setContext('bootstrap()');

  // Define needed constants
  const hostname = cs.get('HOSTNAME');
  const port = cs.get('PORT');

  app.enableCors();

  // Start the server
  await app.listen(port, hostname);

  ls.log(`Listening on ${hostname}:${port}`);
}

bootstrap();

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { NestFactory } from '@nestjs/core';

import { ConfigService } from './app/modules/config/services/config/config.service';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const hostname = configService.get('HOSTNAME');
  await app.listen(port, hostname, () => {
    console.log(`Listening at http://${hostname}:${port}`);
  });
}

bootstrap();

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3333;
  await app.listen(port, '127.0.0.1', () => {
    console.log('Listening at http://localhost:' + port);
  });
}

bootstrap();

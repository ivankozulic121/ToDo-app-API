import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule , {cors: true});
  app.setGlobalPrefix('api') // if you want to enable api globally
  await app.listen(3000);
}
bootstrap();

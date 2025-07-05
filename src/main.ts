import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { loggerMiddleware } from './middlewares/logger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'fatal', 'error', 'warn', 'debug', 'verbose'],
  });
  app.use(loggerMiddleware)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Automatically remove properties that do not have any decorators
    transform: true, // Automatically transform payloads to DTO instances
    transformOptions: {
      enableImplicitConversion: true, // Allow implicit conversion of types
    },
  }))

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap()
  .then(() => Logger.log(`Application is running on : ${process.env.PORT ?? 3000}`, 'Bootstrap'))
  .catch((err) => Logger.error(err, 'Bootstrap Error'));

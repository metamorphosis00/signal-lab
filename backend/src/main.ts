import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import { loggerConfig } from './logger.config';
import { GlobalExceptionFilter } from './filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  });

  const app = await NestFactory.create(AppModule, {
    logger: loggerConfig,
  });

  app.enableCors({
    origin: 'http://localhost:3001',
  });

  app.useGlobalFilters(new GlobalExceptionFilter());

  const config = new DocumentBuilder()
      .setTitle('Signal Lab API')
      .setDescription('Observability playground API')
      .setVersion('1.0')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
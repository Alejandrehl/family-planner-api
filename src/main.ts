import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import configuration from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');

  app.enableCors({ origin: configuration.origin });

  const config = new DocumentBuilder()
    .setTitle('Family Planner API')
    .setDescription('API for Family Planner application.')
    .setVersion('1.0')
    .setContact(
      'Alejandro Exequiel Hernández Lara',
      'https://www.linkedin.com/in/alejandrrhernandez/',
      'alejandrehl@icloud.com',
    )
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(configuration.port);
  logger.log(`Application listening on port ${configuration.port}`);
}
bootstrap();

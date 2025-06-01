import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/allExceptions.filter';

async function bootstrap() {
  const {CORS_ORIGIN, PORT} = process.env
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  )
  app.enableCors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
  app.setGlobalPrefix("/api")
  app.useGlobalFilters(new AllExceptionsFilter())
  try {
    await app.listen(PORT ?? 3000)
  } catch (error) {
    console.error(error)
  }
}
bootstrap();

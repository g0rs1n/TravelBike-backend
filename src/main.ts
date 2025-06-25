import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/allExceptions.filter';
import { WebSocketAdapter } from './gateway/adapter/gateway.adapter';
import { UserService } from './user/user.service';
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const {CORS_ORIGIN, PORT} = process.env
  const app = await NestFactory.create(AppModule);
  const userService = app.get(UserService)
  const adapter = new WebSocketAdapter(app, userService)
  app.useWebSocketAdapter(adapter)
  app.use(cookieParser())
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )
  app.enableCors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
  app.setGlobalPrefix("/api")
  app.useGlobalFilters(new AllExceptionsFilter())
  try {
    await app.listen(PORT!)
    console.log(`Server run on PORT:${PORT}`)
  } catch (error) {
    console.error(error)
  }
}
bootstrap();

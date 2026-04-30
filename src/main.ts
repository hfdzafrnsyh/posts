import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  app.use(cookieParser.default())

  app.enableCors({
    origin: [
      'http://localhost:5173', // untuk development
      'http://127.0.0.1:5173', // untuk development IPv4
      'http://[::1]:5173', // untuk development IPv6
      'http://localhost:5174', // untuk testing API langsung
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204,
  });


  const config = new DocumentBuilder()
  .setTitle('My API')
  .setDescription('API documentation')
  .setVersion('1.0')
  .addBearerAuth() // 🔐 untuk JWT
  .build();

const document = SwaggerModule.createDocument(app, config);

SwaggerModule.setup('api', app, document); 
// akses di http://localhost:3000/api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

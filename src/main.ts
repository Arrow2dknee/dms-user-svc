import { Transport } from '@nestjs/microservices';
import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { join } from 'path';

import { AppModule } from './app.module';
import { protobufPackage } from './users/user.pb';
import { AllExceptionsFilter } from './users/filters/exception.filter';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:5001',
        package: protobufPackage,
        protoPath: join('node_modules/dms-proto/proto/user.proto'),
      },
    },
  );
  // const httpAdapter = app.get(HttpAdapterHost);

  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen();
}

bootstrap();

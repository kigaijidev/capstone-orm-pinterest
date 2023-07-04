import * as dotenv from 'dotenv';
import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    dotenv.config();
    const app = await NestFactory.create(AppModule, {
        logger: ['error','warn']
    });

    app.enableCors();
    app.use(express.static("."));
    app.use(compression());
    app.use(helmet());
    app.use(morgan('combined'))
    app.use(cookieParser());

    const config = new DocumentBuilder()
        .setTitle('CAPSTONE ORM PINTEREST')
        .addBearerAuth()
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.APP_PORT);
}
bootstrap();

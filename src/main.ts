import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm';
import { Session } from './core/authentication/entity/session.entity'
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session'
import { TypeormStore } from 'connect-typeorm'

dotenv.config()

export const SessionAppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: process.env.LOG_SQL === 'true',
  entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api')
  await app.listen(process.env.PORT);

  await SessionAppDataSource.initialize()

  const repositorySession = SessionAppDataSource.getRepository(Session)

  const configService = app.get(ConfigService)

  app.use(
    session({
      secret:
        configService.get('TRAZO_SESSION_SECRET') || '',
      resave: false,
      saveUninitialized: false,
      rolling: true,
      name: 'base.connect.sid',
      cookie: {
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
      },
      store: new TypeormStore({ ttl: 3600, cleanupLimit: 2 }).connect(
        repositorySession
      ),
    })
  )
}
bootstrap();

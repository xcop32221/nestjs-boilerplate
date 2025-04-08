import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import requestID from 'express-request-id'
import { nanoid } from 'nanoid'
import { AppModule } from './app.module'
import { LoggerInterceptor } from './interceptors'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true })

  app.set('query parser', 'extended')

  app.use(requestID({ generator: () => nanoid() }))

  app.useGlobalInterceptors(new LoggerInterceptor())

  const configService = app.get<ConfigService>(ConfigService)

  const port = configService.get<number>('app.port')

  const config = new DocumentBuilder()
    .setTitle('调货服务')
    .setDescription('调货服务')
    .setVersion('1.0')
    .addTag('调货')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(port, '0.0.0.0')

  console.log('App running on port:' + port)
}

bootstrap().catch(bootstrap)

import configuration from '@config'
import { HttpExceptionFilter, MongooseErrorFilter } from '@filters'
import { JwtGuard } from '@guards'
import { TransformInterceptor } from '@interceptors'
import { RedisModule } from '@nestjs-modules/ioredis'
import { BullModule } from '@nestjs/bullmq'
import { Logger, Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { pick } from 'lodash'
import { DatabaseModule } from './database/database.module'
import modules from './modules'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    DatabaseModule,
    RedisModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'single',
        url: configService.get<string>('redis.uri'),
      }),
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redis = configService.get('redis')
        return {
          connection: pick(redis, ['host', 'port', 'db', 'password']),
        }
      },
    }),
    ...modules,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: MongooseErrorFilter,
    },
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({ transform: true }),
    },
    Logger,
  ],
})
export class AppModule {}

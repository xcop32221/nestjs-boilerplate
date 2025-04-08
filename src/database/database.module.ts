import features from '@features'
import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

const module = MongooseModule.forFeature(features)

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('mongo.uri'),
        }
      },
      inject: [ConfigService],
    }),
    module,
  ],
  exports: [module],
})
@Global()
export class DatabaseModule {}

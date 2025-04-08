import { PASSTHROUGH } from '@constants'
import { SetMetadata } from '@nestjs/common'

export const PassThrough = () => SetMetadata(PASSTHROUGH, true)

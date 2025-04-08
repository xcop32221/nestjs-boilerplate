import { Prop } from '@typegoose/typegoose'
import { Expose } from 'class-transformer'
import { Base } from './base'

export class User extends Base {
  @Prop({ unique: true, index: true })
  @Expose()
  email: string

  @Prop({ unique: true, index: true })
  @Expose()
  username: string

  @Prop()
  password: string

  @Prop({ type: Boolean, default: false })
  isAdmin: boolean
}

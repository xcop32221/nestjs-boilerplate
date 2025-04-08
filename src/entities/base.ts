import { Prop, Severity, getClass, modelOptions, plugin } from '@typegoose/typegoose'
import { nanoid } from '@utils'
import { Exclude, Expose, instanceToPlain, plainToInstance } from 'class-transformer'
import { FilterQuery, PaginateOptions, PaginateResult, PipelineStage, SchemaOptions } from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'
import mongoosePaginate from 'mongoose-paginate-v2'

@modelOptions({
  schemaOptions: {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    toJSON: {
      virtuals: true,
      getters: true,
      versionKey: false,
      transform: (doc, ret) => {
        return instanceToPlain(plainToInstance(getClass(doc) as any, ret))
      },
    },
    toObject: { virtuals: true, versionKey: false, getters: true },
  },
  options: { allowMixed: Severity.ALLOW },
})
@plugin(mongoosePaginate)
@plugin(aggregatePaginate)
@Exclude()
export class Base {
  static options?: SchemaOptions
  static paginate: <T extends Base>(
    query?: FilterQuery<T>,
    options?: PaginateOptions,
    callback?: (err: Error, result: PaginateResult<T>) => void,
  ) => Promise<PaginateResult<T> & { list: T[]; total: number }>

  static aggregatePaginate: <T extends Base>(
    query?: PipelineStage[],
    options?: PaginateOptions,
    callback?: (err: Error, result: PaginateResult<T>) => void,
  ) => Promise<PaginateResult<T> & { list: T[]; total: number }>

  @Expose()
  @Prop({ type: Number })
  createdAt: number

  @Expose()
  @Prop({ type: Number })
  updatedAt: number

  @Exclude()
  @Prop({ default: () => nanoid() })
  _id: string | number

  @Expose()
  @Prop({ type: Boolean, default: false })
  isBlocked: boolean //是否禁用

  @Expose()
  get id() {
    return this._id
  }

  set id(newId) {
    this._id = newId
  }
}

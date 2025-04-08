import { User } from '@entities'
import { RegisterDto } from '@modules/auth/dtos'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { DocumentType, ReturnModelType } from '@typegoose/typegoose'
import { encryptPassword } from '@utils'
import { FilterQuery } from 'mongoose'
import { UserPageQueryDto } from './dtos'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: ReturnModelType<typeof User>) {}

  async page(input: UserPageQueryDto) {
    const { query, options } = input
    return await this.userModel.paginate(query, options)
  }

  async getUserInfo(userId: string) {
    const user = await this.userModel.findById(userId).orFail()
    return user.toJSON()
  }

  async create(input: RegisterDto) {
    input.password = encryptPassword(input.password)
    return await this.userModel.create(input)
  }

  async findOne(filter: FilterQuery<DocumentType<User>>) {
    return this.userModel.findOne(filter)
  }
}

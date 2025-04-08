import { PageQueryDto } from '@dtos'
import { ApiHideProperty, ApiProperty, IntersectionType } from '@nestjs/swagger'
import { IsEmail, IsOptional } from 'class-validator'

export class UserQuery {
  @ApiProperty({ name: '邮箱', required: false })
  @IsEmail()
  @IsOptional()
  email?: string
}

export class UserPageQueryDto extends IntersectionType(PageQueryDto, UserQuery) {
  @ApiHideProperty()
  query: UserQuery
}

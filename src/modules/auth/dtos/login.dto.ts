import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class LoginDto {
  @ApiProperty({
    name: '邮箱',
    example: '1492614223@qq.com',
  })
  @IsEmail()
  email: string

  @ApiProperty({ name: '密码' })
  @MinLength(6)
  @MaxLength(20)
  @IsString()
  password: string
}

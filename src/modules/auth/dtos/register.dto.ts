import { IsEmail, IsString, MaxLength, MinLength, NotContains } from 'class-validator'

export class RegisterDto {
  /**
   * 邮箱
   * @example 1492614223@qq.com
   */
  @IsEmail()
  email: string

  /**
   * 用户名
   * @example blackcat
   */
  @NotContains('@')
  username: string

  /**
   * 密码
   */
  @MinLength(6)
  @MaxLength(20)
  @IsString()
  password: string
}

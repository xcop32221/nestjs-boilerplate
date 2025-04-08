import { IsNotEmpty, IsString } from 'class-validator'

export class OAuthLoginDto {
  @IsNotEmpty()
  @IsString()
  code: string
}

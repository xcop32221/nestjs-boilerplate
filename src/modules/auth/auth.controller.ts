import { Public } from '@decorators'
import { RegisterDto } from '@modules/auth/dtos'
import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LoginDto } from './dtos/login.dto'

@ApiTags('登录')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登陆' })
  @Post('/login')
  @Public()
  async login(@Body() input: LoginDto) {
    return this.authService.login(input)
  }

  @ApiOperation({ summary: '注册' })
  @Post('/register')
  @Public()
  async register(@Body() input: RegisterDto) {
    return this.authService.register(input)
  }
}

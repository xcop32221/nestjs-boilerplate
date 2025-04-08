import { User } from '@entities'
import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { validatePassword } from '@utils'
import { UserService } from '../user'
import { LoginDto, RegisterDto } from './dtos'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  public async login(input: LoginDto) {
    const { email, password } = input
    const user = await this.userService.findOne({ email })
    if (user && validatePassword(password, user.password)) {
      return this.generateJWT(user.toObject())
    }
    throw new BadRequestException('Your email and password do not match. Please try again!')
  }

  public async register(input: RegisterDto) {
    const exists = await this.userService.findOne({ email: input.email })
    if (exists) {
      throw new BadRequestException('This email has been registered')
    }
    const user = await this.userService.create(input)
    return this.generateJWT(user.toObject())
  }

  private generateJWT(user: User) {
    const { id, isAdmin, ...rest } = user
    const payload = { id, isAdmin }
    return { token: this.jwtService.sign(payload), id, ...rest }
  }
}

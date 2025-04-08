import { Public } from '@decorators'
import { Controller, Get, Query, Req, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ParseQueryPipe } from '@pipes'
import { UserPageQueryDto } from './dtos'
import { UserService } from './user.service'

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '获取当前用户信息' })
  @Get('/@me')
  async user(@Req() req: any) {
    return this.userService.getUserInfo(req.user.id)
  }

  @ApiOperation({ summary: '获取用户列表' })
  @Get('page')
  @UsePipes(ParseQueryPipe)
  page(@Query() query: UserPageQueryDto) {
    return this.userService.page(query)
  }
}

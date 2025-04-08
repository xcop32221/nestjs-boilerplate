import { Public } from '@decorators'
import { CanActivate, ExecutionContext, Injectable, UseGuards, applyDecorators } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class InternalServiceGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  canActivate(context: ExecutionContext): boolean {
    const key = this.configService.get('internal.secret')
    const request = context.switchToHttp().getRequest()
    return key === request?.headers?.['x-internal-access']
  }
}

export function UseInternalServiceGuard() {
  return applyDecorators(Public(), UseGuards(InternalServiceGuard))
}

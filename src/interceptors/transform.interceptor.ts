import { PASSTHROUGH } from '@constants/passthrough'
import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import type { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Response<T = any> {
  err: boolean
  res?: T
  msg?: string
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const passthrough = this.reflector.getAllAndOverride<boolean>(PASSTHROUGH, [
      context.getHandler(),
      context.getClass(),
    ])
    if (passthrough) return next.handle()
    return next.handle().pipe(map((data) => ({ data, err: false })))
  }
}

import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import type { Response } from 'express'
import { isString } from 'lodash'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()
    const status = exception.getStatus()
    const response = exception.getResponse()
    let msg: string
    if (isString(response)) {
      msg = response
    } else {
      const { message } = response as any
      msg = Array.isArray(message) ? message.join('; ') : message
    }
    res.status(status).json({
      code: status,
      err: true,
      msg,
    })
  }
}

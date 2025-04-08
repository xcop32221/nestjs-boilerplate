import { CallHandler, ExecutionContext, HttpException, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { isEmpty } from 'lodash'
import { Observable } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private logger = new Logger('Request')

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requestAt = Date.now()
    const ctx = context.switchToHttp()
    const request = ctx.getRequest()
    const { method, body, url, user, query, params, id } = request
    const parts = [`[${id}] ${method} ${url} ${user?.id || ''}`]
    if (!isEmpty(params)) {
      parts.push(`params: ${JSON.stringify(params)}`)
    }
    if (!isEmpty(query)) {
      parts.push(`query: ${JSON.stringify(query)}`)
    }
    if (!isEmpty(body)) {
      parts.push(`body: ${JSON.stringify(body)}`)
    }
    this.logger.log(parts.join('\n'))
    return next.handle().pipe(
      tap(() => this.logger.log(`[${id}] SUCCESS ${Date.now() - requestAt}ms`)),
      catchError((err) => {
        let msg: string | Error
        if (err instanceof HttpException) {
          const { message, error } = err?.getResponse() as any
          msg = `${error}: `
          if (Array.isArray(message)) {
            msg += message.join('; ')
          } else {
            msg += message
          }
        } else {
          msg = err
        }
        this.logger.error(`[${id}] ${Date.now() - requestAt}ms ${msg} `)
        throw err
      }),
    )
  }
}

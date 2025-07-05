import { CallHandler, ExecutionContext, Logger, NestInterceptor, Body } from '@nestjs/common';
import { Observable, tap } from "rxjs";


export class RequestTime implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    // execution before handle
    const now = Date.now();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const url = request.url;
    // Logger.log(request.body)
    return next.handle().pipe(
      tap(() => Logger.log(`Request-Response time for ${url} = ${Date.now() - now}`))
    )
  }
}
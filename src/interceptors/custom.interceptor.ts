// import { CallHandler, ExecutionContext, Logger, NestInterceptor } from "@nestjs/common";
// import { Observable, map } from "rxjs";


// export class CustomInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

//     Logger.log(`this is intercepting the request`);
//     Logger.log({ context })

//     return next.handle().pipe(
//       map((data) => {
//         Logger.log("this is interceptor the response")
//         Logger.log({ data })
//         return data;
//       })
//     )
//   }

// }
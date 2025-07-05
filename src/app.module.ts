import { Module } from '@nestjs/common';
import { ReportModule } from './report/report.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { APP_INTERCEPTOR } from '@nestjs/core';
// import { CustomInterceptor } from './interceptors/custom.interceptor';
import { RequestTime } from './interceptors/request-time.interceptor';
import { ExcludeNullInterceptor } from './interceptors/excludeNull.interceptor';

@Module({
  imports: [ReportModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
    load: [configuration]
  })],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestTime
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ExcludeNullInterceptor
    }
  ],
})
export class AppModule { }

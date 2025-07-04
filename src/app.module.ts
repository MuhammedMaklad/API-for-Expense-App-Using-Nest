import { Module } from '@nestjs/common';
import { ReportModule } from './report/report.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [ReportModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
    load: [configuration]
  })],
  controllers: [],
  providers: [],
})
export class AppModule { }

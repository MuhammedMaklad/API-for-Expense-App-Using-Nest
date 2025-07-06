import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ReportModule } from './report/report.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestTime } from './interceptors/request-time.interceptor';
import { ExcludeNullInterceptor } from './interceptors/excludeNull.interceptor';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ReportModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const uri = config.get<string>('database.connectionString');
        if (!uri) {
          throw new Error('Database connection string is undefined!');
        }
        return { uri };
      },
      inject: [ConfigService]
    }),
    JwtModule.registerAsync({
      global: true, // Makes this JWT module available globally throughout the application, You won't need to import it in other modules to use its services
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: ((config: ConfigService) => {
        const secret = config.get<string>('jwt.secret')
        if (!secret)
          throw new Error("JWT Secret is undefined")
        return { secret }
      })

    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration]
    })
    , AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
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

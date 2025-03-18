import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrpcModule } from './trpc/trpc.module';
import { TrpcMiddleware } from './trpc/trpc.middleware';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { FlightRequestsModule } from './flight-requests/flight-requests.module';
import { FlightRequestQuotationModule } from './flight-request-quotation/flight-request-quotation.module';

@Module({
  imports: [
    TrpcModule,
    SupabaseModule,
    ConfigModule.forRoot(),
    FlightRequestsModule,
    FlightRequestQuotationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TrpcMiddleware).forRoutes('trpc');
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RavePaymentModule } from './rave-payment/rave-payment.module';

@Module({
  imports: [RavePaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

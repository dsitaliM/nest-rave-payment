import { Module, HttpService } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RavePaymentModule } from './rave-payment/rave-payment.module';

@Module({
  imports: [
    RavePaymentModule.register(
      {
        PBFPubKey: 'FLWPUBK-ba0a57153f497c03bf34a9e296aa9439-X',
        currency: 'NGN',
        country: 'NG',
        secretKey: 'FLWSECK-327b3874ca8e75640a1198a1b75c0b0b-X',
        chargeEndpoint: 'https://api.ravepay.co/flwv3-pug/getpaidx/api/charge',
        hostURL: 'http://localhost:3000',
      },
      new HttpService(),
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

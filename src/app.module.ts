import { Module, HttpService } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RavePaymentModule } from './rave-payment/rave-payment.module';

@Module({
  imports: [RavePaymentModule.register({
    PBFPubKey: 'FLWPUBK_TEST-742eb5e0eef2888e1c12b0affecad047-X',
    currency: 'ZMW',
    country: 'ZM',
    secretKey: 'A very secret key',
    chargeEndpoint: 'https://api.ravepay.co/flwv3-pug/getpaidx/api/charge',
    hostURL: "http://localhost:3000"
  }, new HttpService())],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

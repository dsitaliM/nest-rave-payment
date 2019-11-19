import { Module, HttpService } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RavePaymentModule } from './rave-payment/rave-payment.module';

@Module({
  imports: [
    RavePaymentModule.register({
      PBFPubKey: 'FLWPUBK_TEST-742eb5e0eef2888e1c12b0affecad047-X',
      secretKey: 'FLWSECK_TEST-6a6ee87e483b1853764103b97f629315-X',
      currency: 'ZMW',
      country: 'ZM',
      chargeEndpoint: 'https://ravesandbox.flutterwave.com/pay/2oqbbld980mr',
      hostURL: 'http://localhost:3000',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

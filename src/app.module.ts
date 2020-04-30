import { Module, HttpService } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RavePaymentModule } from './rave-payment/rave-payment.module';

@Module({
  imports: [
    RavePaymentModule.register({
      PBFPubKey: 'FLWPUBK_TEST-495ddea7da98f206fecb8f46aebaa6ab-X',
      secretKey: 'FLWSECK_TEST-096df3a0517dfbc63f167c0bc2e782c7-X',
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

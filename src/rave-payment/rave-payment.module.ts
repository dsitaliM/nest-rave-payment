import { Module, DynamicModule, HttpModule } from '@nestjs/common';
import { Config } from './interfaces/config';
import { RavePaymentService } from './rave-payment.service';

@Module({
  imports: [HttpModule],
})
export class RavePaymentModule {
  public static register(options: Config): DynamicModule {
    return {
      module: RavePaymentModule,
      providers: [
        {
          provide: RavePaymentService,
          useValue: new RavePaymentService(options),
        },
      ],
      exports: [RavePaymentService],
    };
  }
}

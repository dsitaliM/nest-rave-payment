import { Module, DynamicModule, HttpModule, HttpService } from '@nestjs/common';
import { Config } from './interfaces/config';
import { RavePaymentService } from './rave-payment.service';
import { RavePaymentController } from './rave-payment.controller';

@Module({})
export class RavePaymentModule {
  public static register(options: Config, http: HttpService): DynamicModule {
    return {
      module: RavePaymentModule,
      imports: [HttpModule],
      controllers: [RavePaymentController],
      providers: [
        {
          provide: RavePaymentService,
          useValue: new RavePaymentService(options, http),
        },
      ],
      exports: [RavePaymentService],
    };
  }
}

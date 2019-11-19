import { Controller, Post, Body, Logger, Res, Get } from '@nestjs/common';
import { RaveCardPaymentDTO } from './dtos/rave-payload.dto';
import { RavePaymentService } from './rave-payment.service';
import { Response } from 'express';

@Controller('rave')
export class RavePaymentController {
  constructor(private readonly raveService: RavePaymentService) {}

  @Post('charge-card')
  async chargeCard(@Body() card: RaveCardPaymentDTO) {
    return this.raveService
      .chargeCard(card)
      .then(data => {
        console.log(data);
        Logger.log(data, 'ChargeCard');
      })
      .catch(err => {
        console.log(err);
        Logger.error(err, 'ChargeCard');
      });
    // return this.raveService.testEndpoint();
  }

  @Post('charge-momo')
  chargeMomo() {}

  @Post('verify')
  verifyPayment() {}
}

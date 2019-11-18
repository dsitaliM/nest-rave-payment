import { Controller, Post, Body, Logger, Res } from '@nestjs/common';
import { RaveCardPaymentDTO } from './dtos/rave-payload.dto';
import { RavePaymentService } from './rave-payment.service';
import { Response } from 'express';

@Controller()
export class RavePaymentController {
  constructor(private readonly raveService: RavePaymentService) {}

  @Post('charge-card')
  chargeCard(@Body() card: RaveCardPaymentDTO, @Res() res: Response) {
    this.raveService
      .chargeCard(card)
      .then(data => {
        Logger.log(data, 'ChargeCard');
        res.json({
          statusCode: 200,
          message: data,
        });
      })
      .catch(err => {
        Logger.error(err, 'ChargeCard');
        res.json({
          statusCode: 500,
          message: err,
        });
      });
  }

  @Post('charge-momo')
  chargeMomo() {}

  @Post('verify')
  verifyPayment() {}
}

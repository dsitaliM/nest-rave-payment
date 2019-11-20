import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { RaveCardPaymentDTO } from './dtos/rave-payload.dto';
import { RavePaymentService } from './rave-payment.service';
import { Request, Response } from 'express';

@Controller('rave')
export class RavePaymentController {
  constructor(private readonly raveService: RavePaymentService) {}

  @Post('charge-card')
  async chargeCard(@Body() card: RaveCardPaymentDTO) {
    let response: Object = {};
    await this.raveService
      .makePayment(card)
      .then(res => {
        response = res;
      })
      .catch(err => {
        response = err;
      });

    console.log(response);
    return response;
  }

  @Post('charge-momo')
  chargeMomo() {}

  @Get('verify')
  verifyPayment(@Req() response: Response) {
    console.log('Verifying');
    console.log(response);
    response.render('Successfull');
  }
}

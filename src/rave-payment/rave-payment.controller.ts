import { Controller, Post, Body } from '@nestjs/common';
import { RaveCardPaymentDTO } from './dtos/rave-payload.dto';
import { RavePaymentService } from './rave-payment.service';

@Controller('rave')
export class RavePaymentController {
  constructor(private readonly raveService: RavePaymentService) {}

  @Post('charge-card')
  async chargeCard(@Body() card: RaveCardPaymentDTO) {
    return this.raveService.makePayment(card);
  }

  @Post('charge-momo')
  chargeMomo() {}

  @Post('verify')
  verifyPayment() {}
}

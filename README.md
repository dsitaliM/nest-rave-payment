## Nestjs Rave Payments

More documentation coming

### Usage

In your application module, add the following:

```typescript
RavePaymentModule.register({
  PBFPubKey: 'Your public key',
  secretKey: 'Your secret key',
  currency: 'Your currency',
  country: 'Your country',
  chargeEndpoint: 'https://api.ravepay.co/flwv3-pug/getpaidx/api/charge',
  hostURL: 'Your host URL',
});
```

Then add an endpoint to your controller, e.g:

```typescript
constructor(private readonly raveService: RavePaymentService) {}

  @Post()
  async chargeCard(@Body() card: RaveCardPaymentDTO) {
    return this.raveService.makePayment(card);
  }
```

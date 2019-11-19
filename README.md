## Nestjs Rave Payments

More documentation coming

### Usage

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

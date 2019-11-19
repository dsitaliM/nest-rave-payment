import { Injectable } from '@nestjs/common';
import { Config } from './interfaces/config';
import { RaveCardPaymentDTO } from './dtos/rave-payload.dto';

import * as forge from 'node-forge';
import * as md5 from 'md5';
import * as request from 'request-promise-native';

import { RaveCardPayload } from './models/rave-payload.model';
import { RavePaymentOptions } from './interfaces/payment-options';

@Injectable()
export class RavePaymentService {
  constructor(private readonly config: Config) {}

  makePayment(cardDetails: RaveCardPaymentDTO) {
    let rave = new Rave(this.config.PBFPubKey, this.config.secretKey);
    const payload: RaveCardPayload = {
      currency: this.config.currency,
      country: this.config.country,
      txRef: `MC-${Date.now()}`,
      redirect_url: `${this.config.hostURL}/rave/verify`,
      // redirect_url: 'http://localhost:3000/rave/verify',
      ...cardDetails,
    };

    rave
      .initiatePayment(payload)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
}

export class Rave {
  constructor(
    private readonly publicKey: string,
    private readonly secretKey: string,
  ) {}

  private encryptCardDetails(payload: RaveCardPayload) {
    let cardDetails = JSON.stringify(payload);
    let cipher = forge.cipher.createCipher(
      '3DES-ECB',
      forge.util.createBuffer(this.getKey()),
    );
    cipher.start({ iv: '' });
    cipher.update(forge.util.createBuffer(cardDetails, 'utf8'));
    cipher.finish();

    let encrypted = cipher.output;
    return forge.util.encode64(encrypted.getBytes());
  }

  private getKey(): string {
    let secKey = this.secretKey;
    let keymd5 = md5(secKey);
    let keymd5last12 = keymd5.substr(-12);

    let secKeyAdjusted = secKey.replace('FLWSECK-', '');
    let secKeyAdjustedFirst12 = secKeyAdjusted.substr(0, 12);

    return secKeyAdjustedFirst12 + keymd5last12;
  }

  public initiatePayment(payload: RaveCardPayload) {
    return new Promise((resolve, reject) => {
      let encryptedCardDetails = this.encryptCardDetails(payload);
      let paymentOptions: RavePaymentOptions = {
        // url: 'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/charge',
        url: 'https://api.ravepay.co/flwv3-pug/getpaidx/api/charge',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: {
          PBFPubKey: `${this.publicKey}`,
          alg: '3DES-24',
          client: `${encryptedCardDetails}`,
        },
        json: true,
      };

      request(paymentOptions)
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }
}

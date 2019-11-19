import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/common/http';
import { Config } from './interfaces/config';
import { RaveCardPaymentDTO } from './dtos/rave-payload.dto';

import * as crypto from 'crypto';
import * as forge from 'node-forge';
import * as md5 from 'md5';
import * as request from 'request-promise-native';

import { RaveCardPayload } from './models/rave-payload.model';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class RavePaymentService {
  constructor(
    private readonly config: Config,
    private readonly http: HttpService,
  ) {}

  testEndpoint(): string {
    return 'Rave Service Working';
  }

  generateTxRef(): string {
    return `TX-${Date.now()}`;
  }

  makePayment(cardDetails: RaveCardPaymentDTO) {
    let rave = new Rave(this.config.PBFPubKey, this.config.secretKey);
    const payload: RaveCardPayload = {
      // PBFPubKey: this.config.PBFPubKey,
      currency: this.config.currency,
      country: this.config.country,
      txRef: `MC-${Date.now()}`,
      // txRef: this.generateTxRef(),
      // this.config.txRef === null
      //   ? () => `TX-${Date.now()}`
      //   : this.config.txRef(),
      redirect_url: `${this.config.hostURL}/rave/verify`,
      ...cardDetails,
    };

    console.log(this.config.PBFPubKey);

    console.log(payload);

    rave
      .initiatePayment(payload)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  async chargeCard(cardDetails: RaveCardPaymentDTO): Promise<void> {
    const payload: RaveCardPayload = {
      // PBFPubKey: this.config.PBFPubKey,
      currency: this.config.currency,
      country: this.config.country,
      txRef: `MC-${Date.now()}`,
      // txRef: this.generateTxRef(),
      // this.config.txRef === null
      //   ? () => `TX-${Date.now()}`
      //   : this.config.txRef(),
      redirect_url: `${this.config.hostURL}/rave/verify`,
      ...cardDetails,
    };

    const result = await this.raveResponse(payload);
    return result;
  }

  private getKey(): string {
    const keymd5 = crypto
      .createHash('md5')
      .update(this.config.secretKey)
      .digest('hex');

    const keymd5las12 = keymd5.substr(-12);
    const seckeyadjusted = this.config.secretKey.replace('FLWSECK-', '');
    const seckeyadjustedfirst12 = seckeyadjusted.substr(0, 12);

    return seckeyadjustedfirst12 + keymd5las12;
  }

  private encrypt(payload: RaveCardPayload): string {
    let payloadJSON = JSON.stringify(payload);
    const cipher = forge.cipher.createCipher(
      '3DES-ECB',
      forge.util.createBuffer(this.getKey()),
    );
    cipher.start({ iv: '' });
    cipher.update(forge.util.createBuffer(payloadJSON, 'utf8'));
    cipher.finish();
    const encripted = cipher.output;

    return forge.util.encode64(encripted.getBytes());
  }

  private async raveResponse(payload: RaveCardPayload): Promise<void> {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    const requestData = {
      PBFPubKey: this.config.PBFPubKey,
      client: this.encrypt(payload),
      alg: '3DES-24',
    };
    this.http
      .post(this.config.chargeEndpoint, requestData, requestConfig)
      .subscribe(res => {
        Logger.log(res, 'RAVE-RESPONSE');
      });
  }
}

export class Rave {
  constructor(
    private readonly publicKey: string,
    private readonly secretKey: string,
  ) {}

  // private options: PaymentOptions = {
  //   url: 'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/charge',
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //   },
  //   body: {
  //     PBFPubKey: '',
  //     alg: '3DES-24',
  //     client: '',
  //   },
  //   json: true,
  // };

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
      let paymentOptions: PaymentOptions = {
        url:
          'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/charge',
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

export interface PaymentOptions {
  url: string;
  method: string;
  headers: RaveHeaders;
  body: RaveBody;
  json: boolean;
}

export interface RaveHeaders {
  'Content-Type': string;
  Accept: string;
}

export interface RaveBody {
  PBFPubKey: string;
  alg: string;
  client: string;
}

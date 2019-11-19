export interface RavePaymentOptions {
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

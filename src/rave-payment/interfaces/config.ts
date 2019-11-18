/**
 * Initial configuration settings. Needed for the Rave Payload.
 */
export interface Config {
  PBFPubKey: string;
  currency: Currency;
  country: Country;
  secretKey: string;
  chargeEndpoint: string;
  hostURL: string;
  /**
   * Function to generate unique transaction reference.
   *
   * Defaults to
   * ```typescript
   * () => `TX-${Date.now()}`
   * ```
   */
  txRef?: Function;
}

/**
 * Currencies supported by Rave.
 */
export type Currency = '' | '';

/**
 * Countries in which Rave Works
 */
export type Country = '' | '';

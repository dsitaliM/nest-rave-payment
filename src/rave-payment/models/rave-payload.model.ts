import { Currency, Country } from '../interfaces/config';

export class RaveCardPayload {
  /**
   * This is a unique key generated for each button created on Rave’s dashboard.
   */
  // PBFPubKey: string;

  /**
   * This is the specified currency to charge the card in
   */
  currency: Currency;

  /**
   * This is the pair country for the transaction with respect to the currency
   */
  country: Country;

  /**
   * This is the number on the cardholders card
   */
  cardno: string;
  cvv: string;
  expirymonth: string;
  expiryyear: string;

  /**
   * This is the amount to be charged from card
   */
  amount: number;

  /**
   * This is the email address of the customer
   */
  email: string;
  phonenumber: string;
  firstname: string;
  lastname: string;
  txRef: string;
  redirect_url: string;
}

import { Currency, Country } from '../interfaces/config';

export class RaveCardPayload {
  currency: Currency;
  country: Country;
  cardno: string;
  cvv: string;
  expirymonth: string;
  expiryyear: string;
  amount: number;
  email: string;
  phonenumber: string;
  firstname: string;
  lastname: string;
  txRef: string;
  redirect_url: string;
}

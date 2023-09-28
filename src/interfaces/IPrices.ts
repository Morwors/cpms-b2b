import type { Currency } from "./ICurrency";

export interface IPricesAdd{
    id: number,
    amount: number,
    currencyId: number,
    connectorId: number,
    dateTimeFrom: Date,
    dateTimeTo: Date,
    isActive: true
}
export interface IPrice {
    amount: number;
    currencyId: number;
    currency: Currency;
  }
  
import {CurrencyEnum} from "./currency.enum";

export interface RateContextType {
  rate: number;
  variation: number;
  inputCurrency: CurrencyEnum;
  inputAmount: number
  currentCurrency: CurrencyEnum;
  currentAmount: number;
  fixedRate: number;
  activeFixedRate: boolean;
  id?: string;
  date?: Date;
}

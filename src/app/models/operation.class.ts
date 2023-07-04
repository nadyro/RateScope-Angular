import {CurrencyEnum} from "./currency.enum";
import {PERCENT_DIFF} from "./consts";
import {RateContextType} from "./rate.context";

export class Operation {
    private _rate: number;
    private _variation: number;
    private _input_currency: CurrencyEnum;
    private _input_amount: number
    private _current_currency: CurrencyEnum;
    private _current_amount: number;
    private _fixed_rate: number;
    private _active_fixed_rate: boolean;
    private _id: string;
    private _date: Date;


    constructor(context?: RateContextType) {
        this._rate = context ? context.rate : 1.1;
        this._variation = context ? context.variation : 0;
        this._input_currency = context ? context.inputCurrency : CurrencyEnum.EUR;
        this._input_amount = context ? context.inputAmount : 0;
        this._current_currency = context ? context.currentCurrency : CurrencyEnum.DOLLAR;
        this._current_amount = context ? context.currentAmount : 0;
        this._fixed_rate = context ? context.fixedRate : 0;
        this._active_fixed_rate = context ? context.activeFixedRate : false;
        this._id = '1';
        this._date = new Date();
    }

    public getFixedRateValue(): number {
        return PERCENT_DIFF * (this.input_amount * this.fixed_rate);
    }

    public getRealRateValue(): number {
        return PERCENT_DIFF * (this.input_amount * this.rate);
    }
    public getIsFixedRateTwoPercentHigher(): boolean {
        return this.getFixedRateValue() > this.getRealRateValue();
    }


    get rate(): number {
        return this._rate;
    }

    set rate(value: number) {
        this._rate = value;
    }

    get variation(): number {
        return this._variation;
    }

    set variation(value: number) {
        this._variation = value;
    }

    get input_currency(): CurrencyEnum {
        return this._input_currency;
    }

    set input_currency(value: CurrencyEnum) {
        this._input_currency = value;
    }

    get input_amount(): number {
        return this._input_amount;
    }

    set input_amount(value: number) {
        this._input_amount = value;
    }

    get current_currency(): CurrencyEnum {
        return this._current_currency;
    }

    set current_currency(value: CurrencyEnum) {
        this._current_currency = value;
    }

    get current_amount(): number {
        return this._current_amount;
    }

    set current_amount(value: number) {
        this._current_amount = value;
    }

    get fixed_rate(): number {
        return this._fixed_rate;
    }

    set fixed_rate(value: number) {
        this._fixed_rate = value;
    }

    get active_fixed_rate(): boolean {
        return this._active_fixed_rate;
    }

    set active_fixed_rate(value: boolean) {
        this._active_fixed_rate = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }
}

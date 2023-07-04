import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PollingService} from "../services/polling.service";
import {Operation} from "../models/operation.class";
import {CurrencyEnum} from "../models/currency.enum";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private pollingService: PollingService) {
  }

  public operation: Operation = new Operation();
  public allOperations: Operation[] = new Array<Operation>();
  // @ts-ignore
  public form: FormGroup;
  public btnClicked = false;
  public displayedColumns: string[] = ['rate', 'fixed_rate', 'input_amount', 'input_currency', 'current_amount', 'current_currency'];

  public getRateValue = (): number => {
    let rateValueFloat = parseFloat(this.operation.rate.toPrecision(6));
    if (!this.operation.active_fixed_rate) {
      this.operation.rate = parseFloat(rateValueFloat.toPrecision(6));
    } else {
      this.operation.fixed_rate = rateValueFloat;
    }
    return rateValueFloat;
  }

  handleChangeCurrency = () => {
    const inputCurrency = this.operation.input_currency;
    const currentCurrency = this.operation.current_currency;
    this.operation.current_currency = inputCurrency;
    this.operation.input_currency = currentCurrency;
    let changeResult;
    if (currentCurrency === CurrencyEnum.DOLLAR) {
      changeResult = this.operation.input_amount / this.operation.rate;
    } else {
      changeResult = this.operation.rate * this.operation.input_amount;
    }
    this.operation.current_amount = changeResult;
  }
  handleBtnClick() {
    let rateValue = this.getRateValue();
    console.log('OPERATION => ', this.operation);
    const inputAmount = parseFloat(this.operation.input_amount.toPrecision(6));
    let changeResult;
    if (this.operation.input_currency === CurrencyEnum.DOLLAR) {
      changeResult = inputAmount / rateValue;
    } else {
      changeResult = rateValue * inputAmount;
    }

    this.operation.rate = rateValue;
    this.operation.input_amount = inputAmount;
    this.operation.current_amount = parseFloat(changeResult.toPrecision(6))
    this.btnClicked = true;
  }

  public handleCalculate = () => {
    this.operation.id = new Date().getTime().toString()
    if (this.operation.getIsFixedRateTwoPercentHigher()) {
      this.operation.active_fixed_rate = false;
    }
    let rateValue = this.operation.rate;
    const inputAmount = this.operation.input_amount;
    let changeResult: number;
    if (this.operation.input_currency === CurrencyEnum.DOLLAR) {
      changeResult = inputAmount / rateValue;
    } else {
      changeResult = rateValue * inputAmount;
    }
    this.operation.input_amount = inputAmount;
    this.operation.current_amount = parseFloat(changeResult.toPrecision(6));
    if (this.allOperations.length > 0) {
      if (this.allOperations.length === 5)
        this.allOperations.pop();
      this.allOperations.push(this.operation);
    } else {
      this.allOperations.push(this.operation);
    }
  }
  ngOnInit() {

    this.pollingService.pollingSubject.subscribe(res => {
      this.operation = new Operation();
      this.operation.variation = res;
      let rateValue;
      let rateValueFloat = parseFloat(this.form.get('rate')?.value);
      if (!this.operation.active_fixed_rate) {
        if (this.btnClicked)
          rateValue = parseFloat(rateValueFloat.toPrecision(6)) + this.operation.variation;
        else
          rateValue = parseFloat(this.operation.rate.toPrecision(6)) + this.operation.variation;
        this.operation.rate = rateValue;
      } else {
        if (rateValueFloat !== 0) {
          rateValue = parseFloat(rateValueFloat.toPrecision(6)) + this.operation.variation
        } else {
          rateValue = this.operation.rate + this.operation.variation
        }
        this.operation.fixed_rate = rateValue
      }
      const inputAmount = this.operation.input_amount;
      let changeResult: number;
      if (this.operation.input_currency === CurrencyEnum.DOLLAR) {
        changeResult = inputAmount / rateValue;
      } else {
        changeResult = rateValue * inputAmount;
      }
      this.operation.input_amount = inputAmount;
      this.operation.current_amount = parseFloat(changeResult.toPrecision(6));
      if (this.allOperations.length > 0) {
        if (this.allOperations.length === 5)
          this.allOperations.pop();
        this.allOperations.push(this.operation);
      } else {
        this.allOperations.push(this.operation);
      }
      console.log('ALL OPERATIONS => ', this.allOperations)
      console.log('converter here', res);
    })
    this.form = this.formBuilder.group({
      input_amount: [0, [Validators.required]],
      rate: [1.1, [Validators.required]]
    });

    this.form.valueChanges.subscribe(res => {
      this.operation.rate = parseFloat(res.rate.toPrecision(6))
      this.operation.input_amount = parseFloat(res.input_amount);
      console.log('VALID => ', this.form.valid)
      console.log(res);
    })
  }

  onSubmit() {
    console.log(this.form)
  }

  protected readonly CurrencyEnum = CurrencyEnum;
  protected readonly Operation = Operation;
}

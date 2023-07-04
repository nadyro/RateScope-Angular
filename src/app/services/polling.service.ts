import {Injectable} from "@angular/core";
import {MAX_VARIATION, MIN_VARIATION} from "../models/consts";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PollingService {
  constructor() {
  }

  public pollingSubject: Subject<number> = new Subject();
  public getVariation(): Observable<number> {
    let variation = parseFloat(((Math.random() * (MAX_VARIATION - MIN_VARIATION)) + MIN_VARIATION).toPrecision(6));
    console.log(variation)
    this.pollingSubject.next(variation);
    return this.pollingSubject.asObservable();
  }
}

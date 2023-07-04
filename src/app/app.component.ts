import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {interval, startWith, Subscription, switchMap} from "rxjs";
import {PollingService} from "./services/polling.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public polling: Subscription = new Subscription();
  title = 'rateScopeA';
  // @ts-ignore
  @ViewChild("converter") converter: ElementRef;

  constructor(private pollingService: PollingService) {
  }
  ngOnInit() {
    this.converter?.nativeElement.scrollIntoView({behavior: 'smooth'})
    this.polling = interval(3000).subscribe(value => {
      this.pollingService.getVariation();
    })
    this.pollingService.pollingSubject.subscribe(res => console.log('sub ', res))
  }

  ngOnDestroy() {
    this.polling.unsubscribe();
    this.pollingService.pollingSubject.unsubscribe();
  }
}

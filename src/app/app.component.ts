import { Component, OnDestroy } from '@angular/core';

import { BreakpointObserver } from '@angular/cdk/layout';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { InvoiceFormService } from './invoice-form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class AppComponent implements OnDestroy {
  invoiceForm: FormGroup;
  isBigScreen = false;
  smallScreenBreakpointObserver: Subscription;

  constructor(
    private invoiceFormService: InvoiceFormService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.invoiceForm = this.invoiceFormService.invoiceForm;

    this.smallScreenBreakpointObserver = this.breakpointObserver
      .observe('(min-width: 599px)')
      .subscribe((breakPointState) => {
        this.isBigScreen = breakPointState.matches;
      });
  }

  ngOnDestroy() {
    this.smallScreenBreakpointObserver?.unsubscribe();
  }
}

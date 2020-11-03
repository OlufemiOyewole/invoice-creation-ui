import { Component, OnDestroy } from '@angular/core';

import { BreakpointObserver } from '@angular/cdk/layout';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { InvoiceFormService } from './core/invoice-form.service';

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
  currentStepperIndex = 0;
  stepperIndexChecked = false;
  blankForm = new FormGroup({});

  constructor(
    private invoiceFormService: InvoiceFormService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.invoiceForm = this.invoiceFormService.invoiceForm;

    this.smallScreenBreakpointObserver = this.breakpointObserver
      .observe('(min-width: 599px)')
      .subscribe((breakPointState) => {
        this.isBigScreen = breakPointState.matches;

        if (this.currentStepperIndex === 0 && this.stepperIndexChecked) {
          if (!this.isBigScreen) {
            setTimeout(() => {
              this.currentStepperIndex = 1;
            });
          }
        }

        if (this.currentStepperIndex === 1) {
          if (this.isBigScreen) {
            this.currentStepperIndex = 0;
          } else {
            setTimeout(() => {
              this.currentStepperIndex = 2;
            });
          }
        }

        if (this.currentStepperIndex === 2 && this.isBigScreen) {
          this.currentStepperIndex = 1;
        }

        this.stepperIndexChecked = true;
      });
  }

  stepperChanged() {
    this.invoiceFormService.stepperChanged();
  }

  ngOnDestroy() {
    this.smallScreenBreakpointObserver?.unsubscribe();
  }
}

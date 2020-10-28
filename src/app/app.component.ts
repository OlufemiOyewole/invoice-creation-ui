import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { STEPPER_GLOBAL_OPTIONS, StepState } from '@angular/cdk/stepper';
import { Subscription } from 'rxjs';

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
  dateFilter = (d: Date | null): boolean => {
    const day = d || new Date();
    const today = new Date();
    day.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return day.getTime() >= today.getTime();
  };
  invoiceFormGroup: FormGroup = this.fb.group({
    billedTo: ['', Validators.required],
    issueDate: ['', Validators.required],
    dueDate: [''],
    lineItems: this.fb.array([
      this.fb.group({
        description: [undefined, Validators.required],
        unitCost: [undefined, Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
      }),
      this.fb.group({
        description: [undefined, Validators.required],
        unitCost: [undefined, Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
      }),
    ]),
    taxRate: ['', [Validators.max(99), Validators.min(0)]],
  });
  isBigScreen = false;
  smallScreenBreakpointObserver: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder
  ) {
    this.smallScreenBreakpointObserver = this.breakpointObserver
      .observe('(min-width: 599px)')
      .subscribe((breakPointState) => {
        this.isBigScreen = breakPointState.matches;
      });
  }

  get lineItems() {
    return this.invoiceFormGroup.get('lineItems') as FormArray;
  }

  get subtotal() {
    let subtotal = 0;

    this.lineItems.controls.forEach((_, index) => {
      subtotal +=
        this.lineItems.get([index])?.get('unitCost')?.value *
        this.lineItems.get([index])?.get('quantity')?.value;
    });

    return subtotal;
  }

  get taxRate() {
    return (this.invoiceFormGroup.get('taxRate')?.value / 100) * this.subtotal;
  }

  get Total() {
    const total = this.subtotal + this.taxRate;
    return total;
  }

  ngOnDestroy() {
    this.smallScreenBreakpointObserver?.unsubscribe();
  }
}

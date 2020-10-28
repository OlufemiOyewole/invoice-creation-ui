import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  invoiceFormGroup: FormGroup = this.fb.group({
    billedTo: ['', Validators.required],
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
    taxRate: [''],
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

  get Total() {
    const total = this.subtotal + this.invoiceFormGroup.get('taxRate')?.value;
    return total;
  }

  ngOnDestroy() {
    this.smallScreenBreakpointObserver?.unsubscribe();
  }
}

import { Component, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { STEPPER_GLOBAL_OPTIONS, StepState } from '@angular/cdk/stepper';
import { Subscription } from 'rxjs';
import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
} from '@angular/animations';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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
  animations: [
    trigger('addOrRemoveLineItem', [
      transition(':enter', [
        style({
          opacity: 0,
          marginTop: '-172px',
        }),
        animate(
          '0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
          keyframes([
            style({ opacity: 0, marginTop: '-17px', offset: 0.9 }),
            style({ opacity: 1, marginTop: '0px', offset: 1 }),
          ])
        ),
      ]),
      transition(':leave', [
        animate(
          '0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
          keyframes([
            style({ opacity: 1, marginTop: '0px', offset: 0 }),
            style({ opacity: 0, marginTop: '-34px', offset: 0.2 }),
            style({ opacity: 0, marginTop: '-172px', offset: 1 }),
          ])
        ),
      ]),
    ]),
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
    lineItems: this.fb.array([]),
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

  addLineItem() {
    this.lineItems.push(
      this.fb.group({
        description: [undefined, Validators.required],
        unitCost: [undefined, Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
      })
    );
  }

  deleteLineItem(index: number) {
    this.lineItems.removeAt(index);
  }

  drop(event: CdkDragDrop<AbstractControl[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  ngOnDestroy() {
    this.smallScreenBreakpointObserver?.unsubscribe();
  }
}

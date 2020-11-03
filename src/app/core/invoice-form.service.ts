import { Injectable } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DateFilterFn } from '@angular/material/datepicker';

export interface LineItem {
  description: string;
  unitCost?: number;
  quantity: number;
}

export interface FormState {
  seen: boolean;
}

const invalidDueDateValidator = (
  control: FormGroup
): ValidationErrors | null => {
  const issueDate = control.get('issueDate');
  const dueDate = control.get('dueDate');

  return issueDate &&
    dueDate &&
    issueDate.value.getTime() > dueDate.value.getTime()
    ? { invalidDueDate: true }
    : null;
};

const invalidLineItemsCountValidator = (
  control: FormGroup
): ValidationErrors | null => {
  const lineItems = control.get('lineItems');

  return lineItems && !(lineItems as FormArray).length
    ? { invalidLineItemsCount: true }
    : null;
};

@Injectable({
  providedIn: 'root',
})
export class InvoiceFormService {
  invoiceForm: FormGroup = this.fb.group(
    {
      invoiceNumber: ['000001'],
      description: ['', Validators.required],
      billedTo: ['', Validators.required],
      issueDate: [new Date(), Validators.required],
      dueDate: [new Date(), [Validators.required, invalidDueDateValidator]],
      lineItems: this.fb.array([]),
      taxRate: ['', [Validators.min(0), Validators.max(99)]],
    },
    { validators: [invalidDueDateValidator, invalidLineItemsCountValidator] }
  );
  formState: FormState = { seen: false };

  issueDateFilter: DateFilterFn<Date | null> = (d: Date | null): boolean => {
    const day = d || new Date();
    const today = new Date();
    day.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return day.getTime() >= today.getTime();
  };

  dueDateFilter: DateFilterFn<Date | null> = (d: Date | null): boolean => {
    const day = d || new Date();
    const today = this.invoiceForm.get('issueDate')?.value;
    day.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return day.getTime() >= today.getTime();
  };

  constructor(private fb: FormBuilder) {}

  get lineItems() {
    return this.invoiceForm.get('lineItems') as FormArray;
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

  get taxAmount() {
    return (this.invoiceForm.get('taxRate')?.value / 100) * this.subtotal;
  }

  get total() {
    const total = this.subtotal + this.taxAmount;
    return total;
  }

  addLineItem(values: LineItem) {
    this.lineItems.push(
      this.fb.group({
        description: [values?.description, Validators.required],
        unitCost: [
          values?.unitCost || 0,
          [Validators.min(0), Validators.max(1000000000)],
        ],
        quantity: [
          values?.quantity,
          [Validators.required, Validators.min(1), Validators.max(1000000000)],
        ],
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

  stepperChanged() {
    this.formState.seen = true;
  }
}

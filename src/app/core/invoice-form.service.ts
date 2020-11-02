import { Injectable } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

export interface LineItem {
  description: string;
  unitCost?: number;
  quantity: number;
}
@Injectable({
  providedIn: 'root',
})
export class InvoiceFormService {
  invoiceForm: FormGroup = this.fb.group({
    invoiceNumber: ['000001'],
    description: ['', Validators.required],
    billedTo: ['', Validators.required],
    issueDate: [new Date(), Validators.required],
    dueDate: [''],
    lineItems: this.fb.array([]),
    taxRate: ['', [Validators.min(0), Validators.max(99)]],
  });

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
          values?.unitCost,
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
}

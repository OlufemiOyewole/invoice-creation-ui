import { Injectable } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root',
})
export class InvoiceFormService {
  invoiceForm: FormGroup = this.fb.group({
    invoiceNumber: ['000001'],
    description: ['', Validators.required],
    billedTo: ['', Validators.required],
    issueDate: ['', Validators.required],
    dueDate: [''],
    lineItems: this.fb.array([]),
    taxRate: ['', [Validators.max(99), Validators.min(0)]],
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

  get taxRate() {
    return (this.invoiceForm.get('taxRate')?.value / 100) * this.subtotal;
  }

  get total() {
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
}

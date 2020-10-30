import { Component } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
} from '@angular/animations';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { InvoiceFormService } from '../core/invoice-form.service';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css'],
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
export class EditInvoiceComponent {
  dateFilter = (d: Date | null): boolean => {
    const day = d || new Date();
    const today = new Date();
    day.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return day.getTime() >= today.getTime();
  };

  invoiceForm: FormGroup;

  constructor(private invoiceFormService: InvoiceFormService) {
    this.invoiceForm = this.invoiceFormService.invoiceForm;
  }

  get lineItems() {
    return this.invoiceFormService.lineItems;
  }

  get subtotal() {
    return this.invoiceFormService.subtotal;
  }

  get taxRate() {
    return this.invoiceFormService.taxRate;
  }

  get total() {
    return this.invoiceFormService.total;
  }

  addLineItem() {
    this.invoiceFormService.addLineItem();
  }

  deleteLineItem(index: number) {
    this.invoiceFormService.deleteLineItem(index);
  }

  drop(event: CdkDragDrop<AbstractControl[]>) {
    this.invoiceFormService.drop(event);
  }
}

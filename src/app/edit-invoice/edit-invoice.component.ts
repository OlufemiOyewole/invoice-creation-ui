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

import { InvoiceFormService, FormState } from '../core/invoice-form.service';
import { DateFilterFn } from '@angular/material/datepicker';

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
  dueDateFilter: DateFilterFn<Date | null>;
  formState: FormState;
  invoiceForm: FormGroup;
  issueDateFilter: DateFilterFn<Date | null>;

  constructor(private invoiceFormService: InvoiceFormService) {
    this.invoiceForm = this.invoiceFormService.invoiceForm;
    this.issueDateFilter = this.invoiceFormService.issueDateFilter;
    this.dueDateFilter = this.invoiceFormService.dueDateFilter;
    this.formState = this.invoiceFormService.formState;
  }

  get lineItems() {
    return this.invoiceFormService.lineItems;
  }

  get subtotal() {
    return this.invoiceFormService.subtotal;
  }

  get taxAmount() {
    return this.invoiceFormService.taxAmount;
  }

  get total() {
    return this.invoiceFormService.total;
  }

  addLineItem() {
    this.invoiceFormService.addLineItem({ description: '', quantity: 1 });
  }

  deleteLineItem(index: number) {
    this.invoiceFormService.deleteLineItem(index);
  }

  drop(event: CdkDragDrop<AbstractControl[]>) {
    this.invoiceFormService.drop(event);
  }
}

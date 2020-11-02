import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LineItem } from 'src/app/core/invoice-form.service';

export interface InputComponentData {
  invoiceForm: FormGroup | undefined;
  lineItemIndex: number;
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  action: 'add' | 'update';
  invoiceForm: FormGroup = this.fb.group({
    invoiceNumber: ['000001'],
    description: ['', Validators.required],
    billedTo: ['', Validators.required],
    issueDate: [new Date(), Validators.required],
    dueDate: [''],
    lineItems: this.fb.array([
      this.fb.group({
        description: ['', Validators.required],
        unitCost: [
          undefined,
          [Validators.required, Validators.min(0), Validators.max(1000000000)],
        ],
        quantity: [
          1,
          [Validators.required, Validators.min(1), Validators.max(1000000000)],
        ],
      }),
    ]),
    taxRate: ['', [Validators.max(99), Validators.min(0)]],
  });
  lineItemIndex = 0;

  constructor(
    public dialogRef: MatDialogRef<InputComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: InputComponentData,
    private fb: FormBuilder
  ) {
    if (this.data?.invoiceForm) {
      this.invoiceForm = this.data.invoiceForm;
      this.lineItemIndex = this.data.lineItemIndex || 0;
      this.action = 'update';
    } else {
      this.action = 'add';
    }
  }

  get lineItem() {
    return this.invoiceForm.get(['lineItems', this.lineItemIndex]);
  }

  submit() {
    switch (this.action) {
      case 'update':
        this.dialogRef.close();
        break;

      case 'add':
        const lineItem: LineItem = {
          description: this.lineItem?.get('description')?.value,
          unitCost: this.lineItem?.get('unitCost')?.value,
          quantity: this.lineItem?.get('quantity')?.value,
        };
        this.dialogRef.close({ lineItem });
        break;

      default:
        this.dialogRef.close();
        break;
    }
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { LineItem } from 'src/app/core/invoice-form.service';

export interface InputComponentData {
  target: InputTarget;
  invoiceForm: FormGroup | undefined;
  lineItemIndex?: number;
}

export type InputTarget = 'line item' | 'date' | 'rate' | 'number' | 'text';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
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
          0,
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
  target: string;

  constructor(
    public dialogRef: MatDialogRef<InputComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: InputComponentData,
    private fb: FormBuilder
  ) {
    this.target = this.data?.target;
    if (this.data.invoiceForm !== undefined) {
      if (this.data.lineItemIndex !== undefined) {
        this.lineItemIndex = this.data.lineItemIndex;
        const lineItem = this.fb.group({
          description: [
            this.data.invoiceForm.get(['lineItems', this.data.lineItemIndex])
              ?.value,
            Validators.required,
          ],
          unitCost: [
            this.data.invoiceForm.get(['lineItems', this.data.lineItemIndex])
              ?.value,
            Validators.required,
          ],
          quantity: [
            this.data.invoiceForm.get(['lineItems', this.data.lineItemIndex])
              ?.value,
            [Validators.required, Validators.min(1)],
          ],
        });

        (this.invoiceForm.get('lineItems') as FormArray).insert(0, lineItem);
      }
    }
  }

  get lineItem() {
    return this.invoiceForm.get(['lineItems', this.lineItemIndex]);
  }

  close(action: 'okay' | 'cancel') {
    const lineItem: LineItem = {
      description: this.lineItem?.get('description')?.value,
      unitCost: this.lineItem?.get('unitCost')?.value,
      quantity: this.lineItem?.get('quantity')?.value,
    };
    switch (action) {
      case 'okay':
        this.dialogRef.close({ lineItem });
        break;

      case 'cancel':
        this.dialogRef.close();
        break;

      default:
        this.dialogRef.close();
        break;
    }
  }
}

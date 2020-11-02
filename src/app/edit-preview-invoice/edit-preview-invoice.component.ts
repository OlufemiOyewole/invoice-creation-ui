import {
  Component,
  HostListener,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { InvoiceFormService, LineItem } from '../core/invoice-form.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  InputComponent,
  InputComponentData,
} from '../shared/input/input.component';
import { MatDialog } from '@angular/material/dialog';
import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-edit-preview-invoice',
  templateUrl: './edit-preview-invoice.component.html',
  styleUrls: ['./edit-preview-invoice.component.css'],
  animations: [
    trigger('addOrRemoveLineItem', [
      transition(':enter', [
        style({
          opacity: 0,
          marginTop: '-49px',
        }),
        animate(
          '0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
          keyframes([
            style({ opacity: 0, marginTop: '-5px', offset: 0.9 }),
            style({ opacity: 1, marginTop: '0px', offset: 1 }),
          ])
        ),
      ]),
      transition(':leave', [
        animate(
          '0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
          keyframes([
            style({ opacity: 1, marginTop: '0px', offset: 0 }),
            style({ opacity: 0, marginTop: '-9px', offset: 0.2 }),
            style({ opacity: 0, marginTop: '-49px', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class EditPreviewInvoiceComponent implements AfterViewInit {
  @Input() parentContainer?: HTMLDivElement;
  showEditButtons = false;
  @Input() set editMode(editMode: boolean) {
    this._editMode = editMode;
    if (editMode) {
      this.showEditButtons = false;
    }
  }
  @ViewChild('previewContainer') previewContainerElement!: ElementRef;
  invoiceForm: FormGroup;
  invoiceWidth = 820;
  previewHeight = '0px';
  previewScale = 'translate(-50%, 0%) scale(1)';
  scaleInterval: ReturnType<typeof setTimeout> = setTimeout(() => '');
  _editMode = false;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setScale(this.parentContainer?.offsetWidth);
  }

  constructor(
    private invoiceFormService: InvoiceFormService,
    private dialog: MatDialog
  ) {
    this.invoiceForm = this.invoiceFormService.invoiceForm;
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
    const dialogRef = this.dialog.open(InputComponent);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        const lineItem: LineItem = data.lineItem;
        this.invoiceFormService.addLineItem(lineItem);
      }
    });
  }

  editLineItem(index: number) {
    this.dialog.open(InputComponent, {
      data: {
        invoiceForm: this.invoiceFormService.invoiceForm,
        lineItemIndex: index,
      } as InputComponentData,
    });
  }

  deleteLineItem(index: number) {
    this.invoiceFormService.deleteLineItem(index);
  }

  drop(event: CdkDragDrop<AbstractControl[]>) {
    this.invoiceFormService.drop(event);
  }

  ngAfterViewInit() {
    this.setScale(this.parentContainer?.offsetWidth);
  }

  setScale(windowWidth: number | undefined) {
    let scale = windowWidth ? windowWidth / this.invoiceWidth : 1;

    clearInterval(this.scaleInterval);

    this.scaleInterval = setTimeout(() => {
      scale = scale < 1 ? scale : 1;
      this.previewScale = `translate(-50%, 0%) scale(${scale})`;

      setTimeout(() => {
        this.previewHeight =
          this.previewContainerElement.nativeElement.offsetHeight * scale +
          'px';
      });
    }, 10);
  }

  toggleEditButtons(previewCardElement?: HTMLDivElement) {
    if (this._editMode) {
      this.showEditButtons = !this.showEditButtons;
    } else {
      this.showEditButtons = false;
    }
    if (!this.showEditButtons) {
      previewCardElement?.blur();
    }
  }
}

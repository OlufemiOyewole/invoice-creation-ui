import {
  Component,
  HostListener,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { InvoiceFormService } from '../core/invoice-form.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-edit-preview-invoice',
  templateUrl: './edit-preview-invoice.component.html',
  styleUrls: ['./edit-preview-invoice.component.css'],
})
export class EditPreviewInvoiceComponent implements AfterViewInit {
  @Input() parentContainer?: HTMLDivElement;
  cardHighlighted = false;
  @Input() set editMode(editMode: boolean) {
    this._editMode = editMode;
    if (editMode) {
      this.cardHighlighted = false;
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

  constructor(private invoiceFormService: InvoiceFormService) {
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

  toggleEditButtons(eventType: string) {
    switch (eventType) {
      case 'focus':
        setTimeout(() => {
          this.cardHighlighted = true;
        }, 250);
        break;
      case 'blur':
        this.cardHighlighted = false;
        break;
      case 'clicked':
        setTimeout(() => {
          this.cardHighlighted = false;
        }, 250);
        break;

      default:
        this.cardHighlighted = false;
        break;
    }
  }
}

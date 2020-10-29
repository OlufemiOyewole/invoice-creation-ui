import { Component, HostListener, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-edit-preview-invoice',
  templateUrl: './edit-preview-invoice.component.html',
  styleUrls: ['./edit-preview-invoice.component.css'],
})
export class EditPreviewInvoiceComponent implements AfterViewInit {
  @Input() parentContainer?: HTMLDivElement;

  invoiceWidth = 820;
  previewScale = 'translate(-50%, 0%) scale(1)';
  scaleInterval: ReturnType<typeof setTimeout> = setTimeout(() => '');

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setScale(this.parentContainer?.offsetWidth);
  }

  constructor() {}

  setScale(windowWidth: number | undefined) {
    const scale = windowWidth ? windowWidth / this.invoiceWidth : 1;

    clearInterval(this.scaleInterval);

    this.scaleInterval = setTimeout(() => {
      this.previewScale = `translate(-50%, 0%) scale(${scale < 1 ? scale : 1})`;
    }, 10);
  }

  ngAfterViewInit() {
    this.setScale(this.parentContainer?.offsetWidth);
  }
}

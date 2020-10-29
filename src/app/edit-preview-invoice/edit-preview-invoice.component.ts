import {
  Component,
  HostListener,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-edit-preview-invoice',
  templateUrl: './edit-preview-invoice.component.html',
  styleUrls: ['./edit-preview-invoice.component.css'],
})
export class EditPreviewInvoiceComponent implements AfterViewInit {
  @Input() parentContainer?: HTMLDivElement;
  @ViewChild('previewContainer') previewContainerElement!: ElementRef;

  invoiceWidth = 820;
  previewHeight = '0px';
  previewScale = 'translate(-50%, 0%) scale(1)';
  scaleInterval: ReturnType<typeof setTimeout> = setTimeout(() => '');

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setScale(this.parentContainer?.offsetWidth);
  }

  constructor() {}

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

  ngAfterViewInit() {
    this.setScale(this.parentContainer?.offsetWidth);
  }
}

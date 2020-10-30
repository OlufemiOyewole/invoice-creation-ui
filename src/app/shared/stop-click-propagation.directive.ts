import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appStopClickPropagation]',
})
export class StopClickPropagationDirective {
  @Input() appStopClickPropagation?: boolean | string;

  @HostListener('click', ['$event'])
  public onClick(event: Event): void {
    if (this.appStopClickPropagation !== false) {
      event.stopPropagation();
    }
  }
  constructor() {}
}

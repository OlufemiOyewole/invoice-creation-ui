import { Component, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  invoiceFormGroup: FormGroup = this.fb.group({
    description: new FormControl('', Validators.required),
  });
  isBigScreen = false;
  smallScreenBreakpointObserver: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder
  ) {
    this.smallScreenBreakpointObserver = this.breakpointObserver
      .observe('(min-width: 599px)')
      .subscribe((breakPointState) => {
        this.isBigScreen = breakPointState.matches;
      });
  }

  ngOnDestroy() {
    this.smallScreenBreakpointObserver?.unsubscribe();
  }
}

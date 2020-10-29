import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialComponentsModule } from '../core/material-components.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditInvoiceMobileComponent } from './edit-invoice-mobile.component';

describe('EditInvoiceMobileComponent', () => {
  let component: EditInvoiceMobileComponent;
  let fixture: ComponentFixture<EditInvoiceMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MaterialComponentsModule,
        DragDropModule,
        BrowserAnimationsModule,
      ],
      declarations: [EditInvoiceMobileComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInvoiceMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

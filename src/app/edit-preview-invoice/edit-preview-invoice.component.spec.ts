import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialComponentsModule } from '../core/material-components.module';
import { EditPreviewInvoiceComponent } from './edit-preview-invoice.component';

describe('EditPreviewInvoiceComponent', () => {
  let component: EditPreviewInvoiceComponent;
  let fixture: ComponentFixture<EditPreviewInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MaterialComponentsModule],
      declarations: [EditPreviewInvoiceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPreviewInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

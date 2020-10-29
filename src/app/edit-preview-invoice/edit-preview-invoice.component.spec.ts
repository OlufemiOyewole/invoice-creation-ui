import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPreviewInvoiceComponent } from './edit-preview-invoice.component';

describe('EditPreviewInvoiceComponent', () => {
  let component: EditPreviewInvoiceComponent;
  let fixture: ComponentFixture<EditPreviewInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPreviewInvoiceComponent ]
    })
    .compileComponents();
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInvoiceMobileComponent } from './edit-invoice-mobile.component';

describe('EditInvoiceMobileComponent', () => {
  let component: EditInvoiceMobileComponent;
  let fixture: ComponentFixture<EditInvoiceMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInvoiceMobileComponent ]
    })
    .compileComponents();
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

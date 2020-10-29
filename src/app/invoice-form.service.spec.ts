import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { InvoiceFormService } from './invoice-form.service';

describe('InvoiceFormService', () => {
  let service: InvoiceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
    });
    service = TestBed.inject(InvoiceFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

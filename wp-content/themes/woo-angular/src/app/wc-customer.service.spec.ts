import { TestBed, inject } from '@angular/core/testing';

import { WcCustomerService } from './wc-customer.service';

describe('WcCustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WcCustomerService]
    });
  });

  it('should be created', inject([WcCustomerService], (service: WcCustomerService) => {
    expect(service).toBeTruthy();
  }));
});

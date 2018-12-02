import { TestBed, inject } from '@angular/core/testing';

import { WcCheckoutService } from './wc-checkout.service';

describe('WcOrdersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WcCheckoutService]
    });
  });

  it('should be created', inject([WcCheckoutService], (service: WcCheckoutService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { WcCartService } from './wc-cart.service';

describe('WcCartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WcCartService]
    });
  });

  it('should be created', inject([WcCartService], (service: WcCartService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { WcApiService } from './wc-api.service';

describe('WcApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WcApiService]
    });
  });

  it('should be created', inject([WcApiService], (service: WcApiService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { WpPagesService } from './wp-pages.service';

describe('WpPagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WpPagesService]
    });
  });

  it('should be created', inject([WpPagesService], (service: WpPagesService) => {
    expect(service).toBeTruthy();
  }));
});

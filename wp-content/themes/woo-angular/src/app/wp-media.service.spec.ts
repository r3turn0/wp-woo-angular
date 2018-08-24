import { TestBed, inject } from '@angular/core/testing';

import { WpMediaService } from './wp-media.service';

describe('WpMediaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WpMediaService]
    });
  });

  it('should be created', inject([WpMediaService], (service: WpMediaService) => {
    expect(service).toBeTruthy();
  }));
});

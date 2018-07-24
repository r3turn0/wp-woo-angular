import { TestBed, inject } from '@angular/core/testing';

import { WpPostsService } from './wp-posts.service';

describe('WpPostsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WpPostsService]
    });
  });

  it('should be created', inject([WpPostsService], (service: WpPostsService) => {
    expect(service).toBeTruthy();
  }));
});

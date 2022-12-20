import { TestBed } from '@angular/core/testing';

import { PriceTransformingService } from './price-transforming.service';

describe('PriceTransformingService', () => {
  let service: PriceTransformingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceTransformingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

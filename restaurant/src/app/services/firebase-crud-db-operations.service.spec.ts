import { TestBed } from '@angular/core/testing';

import { FirebaseCrudDbOperationsService } from './firebase-crud-db-operations.service';

describe('FirebaseCrudDbOperationsService', () => {
  let service: FirebaseCrudDbOperationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseCrudDbOperationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

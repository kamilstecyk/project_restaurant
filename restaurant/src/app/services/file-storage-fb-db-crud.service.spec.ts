import { TestBed } from '@angular/core/testing';

import { FileStorageFbDbCrudService } from './file-storage-fb-db-crud.service';

describe('FileStorageFbDbCrudService', () => {
  let service: FileStorageFbDbCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileStorageFbDbCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

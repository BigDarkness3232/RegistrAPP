import { TestBed } from '@angular/core/testing';

import { ClasesStorageService } from './clases-storage.service';

describe('ClasesStorageService', () => {
  let service: ClasesStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasesStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

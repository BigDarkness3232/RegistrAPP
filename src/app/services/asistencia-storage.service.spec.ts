import { TestBed } from '@angular/core/testing';

import { AsistenciaStorageService } from './asistencia-storage.service';

describe('AsistenciaStorageService', () => {
  let service: AsistenciaStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsistenciaStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

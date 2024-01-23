import { TestBed } from '@angular/core/testing';

import { DefectocalidadService } from './defectocalidad.service';

describe('DefectocalidadService', () => {
  let service: DefectocalidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefectocalidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

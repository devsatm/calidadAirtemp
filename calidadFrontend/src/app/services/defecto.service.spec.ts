import { TestBed } from '@angular/core/testing';

import { DefectoService } from './defecto.service';

describe('DefectoService', () => {
  let service: DefectoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefectoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

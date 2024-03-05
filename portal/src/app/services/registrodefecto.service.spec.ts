import { TestBed } from '@angular/core/testing';

import { RegistrodefectoService } from './registrodefecto.service';

describe('RegistrodefectoService', () => {
  let service: RegistrodefectoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrodefectoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

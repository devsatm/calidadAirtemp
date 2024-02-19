import { TestBed } from '@angular/core/testing';

import { RegistrofinalService } from './registrofinal.service';

describe('RegistrofinalService', () => {
  let service: RegistrofinalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrofinalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

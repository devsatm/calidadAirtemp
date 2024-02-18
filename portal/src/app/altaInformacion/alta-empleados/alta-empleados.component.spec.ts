import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaEmpleadosComponent } from './alta-empleados.component';

describe('AltaEmpleadosComponent', () => {
  let component: AltaEmpleadosComponent;
  let fixture: ComponentFixture<AltaEmpleadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltaEmpleadosComponent]
    });
    fixture = TestBed.createComponent(AltaEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

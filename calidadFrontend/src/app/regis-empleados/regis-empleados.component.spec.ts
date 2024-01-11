import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisEmpleadosComponent } from './regis-empleados.component';

describe('RegisEmpleadosComponent', () => {
  let component: RegisEmpleadosComponent;
  let fixture: ComponentFixture<RegisEmpleadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisEmpleadosComponent]
    });
    fixture = TestBed.createComponent(RegisEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

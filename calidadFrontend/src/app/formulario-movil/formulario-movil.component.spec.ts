import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioMovilComponent } from './formulario-movil.component';

describe('FormularioMovilComponent', () => {
  let component: FormularioMovilComponent;
  let fixture: ComponentFixture<FormularioMovilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioMovilComponent]
    });
    fixture = TestBed.createComponent(FormularioMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

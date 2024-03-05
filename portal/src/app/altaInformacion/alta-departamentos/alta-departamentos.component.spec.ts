import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaDepartamentosComponent } from './alta-departamentos.component';

describe('AltaDepartamentosComponent', () => {
  let component: AltaDepartamentosComponent;
  let fixture: ComponentFixture<AltaDepartamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltaDepartamentosComponent]
    });
    fixture = TestBed.createComponent(AltaDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

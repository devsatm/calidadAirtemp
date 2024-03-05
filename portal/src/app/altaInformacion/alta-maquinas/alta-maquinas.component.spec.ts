import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaMaquinasComponent } from './alta-maquinas.component';

describe('AltaMaquinasComponent', () => {
  let component: AltaMaquinasComponent;
  let fixture: ComponentFixture<AltaMaquinasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltaMaquinasComponent]
    });
    fixture = TestBed.createComponent(AltaMaquinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

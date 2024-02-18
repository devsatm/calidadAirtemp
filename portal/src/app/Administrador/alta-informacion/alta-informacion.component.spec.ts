import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaInformacionComponent } from './alta-informacion.component';

describe('AltaInformacionComponent', () => {
  let component: AltaInformacionComponent;
  let fixture: ComponentFixture<AltaInformacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltaInformacionComponent]
    });
    fixture = TestBed.createComponent(AltaInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

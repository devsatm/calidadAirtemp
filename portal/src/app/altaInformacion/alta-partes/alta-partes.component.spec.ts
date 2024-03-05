import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaPartesComponent } from './alta-partes.component';

describe('AltaPartesComponent', () => {
  let component: AltaPartesComponent;
  let fixture: ComponentFixture<AltaPartesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltaPartesComponent]
    });
    fixture = TestBed.createComponent(AltaPartesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

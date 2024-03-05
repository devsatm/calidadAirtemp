import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaDefectosComponent } from './alta-defectos.component';

describe('AltaDefectosComponent', () => {
  let component: AltaDefectosComponent;
  let fixture: ComponentFixture<AltaDefectosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltaDefectosComponent]
    });
    fixture = TestBed.createComponent(AltaDefectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

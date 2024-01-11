import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaInfoComponent } from './alta-info.component';

describe('AltaInfoComponent', () => {
  let component: AltaInfoComponent;
  let fixture: ComponentFixture<AltaInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltaInfoComponent]
    });
    fixture = TestBed.createComponent(AltaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

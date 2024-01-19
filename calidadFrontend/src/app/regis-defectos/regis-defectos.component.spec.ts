import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisDefectosComponent } from './regis-defectos.component';

describe('RegisDefectosComponent', () => {
  let component: RegisDefectosComponent;
  let fixture: ComponentFixture<RegisDefectosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisDefectosComponent]
    });
    fixture = TestBed.createComponent(RegisDefectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

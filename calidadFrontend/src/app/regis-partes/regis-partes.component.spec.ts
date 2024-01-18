import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisPartesComponent } from './regis-partes.component';

describe('RegisPartesComponent', () => {
  let component: RegisPartesComponent;
  let fixture: ComponentFixture<RegisPartesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisPartesComponent]
    });
    fixture = TestBed.createComponent(RegisPartesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisMaquinasComponent } from './regis-maquinas.component';

describe('RegisMaquinasComponent', () => {
  let component: RegisMaquinasComponent;
  let fixture: ComponentFixture<RegisMaquinasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisMaquinasComponent]
    });
    fixture = TestBed.createComponent(RegisMaquinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisDepartamentosComponent } from './regis-departamentos.component';

describe('RegisDepartamentosComponent', () => {
  let component: RegisDepartamentosComponent;
  let fixture: ComponentFixture<RegisDepartamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisDepartamentosComponent]
    });
    fixture = TestBed.createComponent(RegisDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMisRegistrosComponent } from './ver-mis-registros.component';

describe('VerMisRegistrosComponent', () => {
  let component: VerMisRegistrosComponent;
  let fixture: ComponentFixture<VerMisRegistrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerMisRegistrosComponent]
    });
    fixture = TestBed.createComponent(VerMisRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

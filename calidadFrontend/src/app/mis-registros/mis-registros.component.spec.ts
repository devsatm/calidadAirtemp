import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisRegistrosComponent } from './mis-registros.component';

describe('MisRegistrosComponent', () => {
  let component: MisRegistrosComponent;
  let fixture: ComponentFixture<MisRegistrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisRegistrosComponent]
    });
    fixture = TestBed.createComponent(MisRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

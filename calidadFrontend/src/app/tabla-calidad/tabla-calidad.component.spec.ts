import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCalidadComponent } from './tabla-calidad.component';

describe('TablaCalidadComponent', () => {
  let component: TablaCalidadComponent;
  let fixture: ComponentFixture<TablaCalidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaCalidadComponent]
    });
    fixture = TestBed.createComponent(TablaCalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

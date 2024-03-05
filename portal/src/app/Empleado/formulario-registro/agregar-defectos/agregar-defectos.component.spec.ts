import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDefectosComponent } from './agregar-defectos.component';

describe('AgregarDefectosComponent', () => {
  let component: AgregarDefectosComponent;
  let fixture: ComponentFixture<AgregarDefectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarDefectosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarDefectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

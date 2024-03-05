import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosLosRegistrosComponent } from './todos-los-registros.component';

describe('TodosLosRegistrosComponent', () => {
  let component: TodosLosRegistrosComponent;
  let fixture: ComponentFixture<TodosLosRegistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosLosRegistrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodosLosRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

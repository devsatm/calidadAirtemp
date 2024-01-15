import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMovilComponent } from './header-movil.component';

describe('HeaderMovilComponent', () => {
  let component: HeaderMovilComponent;
  let fixture: ComponentFixture<HeaderMovilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderMovilComponent]
    });
    fixture = TestBed.createComponent(HeaderMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteOffComponent } from './activite-off.component';

describe('ActiviteOffComponent', () => {
  let component: ActiviteOffComponent;
  let fixture: ComponentFixture<ActiviteOffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiviteOffComponent]
    });
    fixture = TestBed.createComponent(ActiviteOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

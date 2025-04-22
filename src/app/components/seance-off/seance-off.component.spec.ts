import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeanceOffComponent } from './seance-off.component';

describe('SeanceOffComponent', () => {
  let component: SeanceOffComponent;
  let fixture: ComponentFixture<SeanceOffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeanceOffComponent]
    });
    fixture = TestBed.createComponent(SeanceOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

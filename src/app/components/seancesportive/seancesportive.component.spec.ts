import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeancesportiveComponent } from './seancesportive.component';

describe('SeancesportiveComponent', () => {
  let component: SeancesportiveComponent;
  let fixture: ComponentFixture<SeancesportiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeancesportiveComponent]
    });
    fixture = TestBed.createComponent(SeancesportiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

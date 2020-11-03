import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PadsOverviewComponent } from './pads-overview.component';

describe('PadsOverviewComponent', () => {
  let component: PadsOverviewComponent;
  let fixture: ComponentFixture<PadsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PadsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PadsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

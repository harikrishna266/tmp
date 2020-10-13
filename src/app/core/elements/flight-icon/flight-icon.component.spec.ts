import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightIconComponent } from './flight-icon.component';

describe('FlightIconComponent', () => {
  let component: FlightIconComponent;
  let fixture: ComponentFixture<FlightIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

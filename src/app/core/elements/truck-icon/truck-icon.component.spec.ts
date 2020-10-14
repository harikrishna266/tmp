import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckIconComponent } from './truck-icon.component';

describe('TruckIconComponent', () => {
  let component: TruckIconComponent;
  let fixture: ComponentFixture<TruckIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruckIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

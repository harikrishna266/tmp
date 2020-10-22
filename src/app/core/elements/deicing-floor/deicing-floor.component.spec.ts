import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeicingFloorComponent } from './deicing-floor.component';

describe('DeicingFloorComponent', () => {
  let component: DeicingFloorComponent;
  let fixture: ComponentFixture<DeicingFloorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeicingFloorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeicingFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

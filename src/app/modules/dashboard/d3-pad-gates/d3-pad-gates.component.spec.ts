import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3PadGatesComponent } from './d3-pad-gates.component';

describe('D3PadGatesComponent', () => {
  let component: D3PadGatesComponent;
  let fixture: ComponentFixture<D3PadGatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3PadGatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3PadGatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

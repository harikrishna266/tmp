import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3GatesComponent } from './d3-gates.component';

describe('D3GatesComponent', () => {
  let component: D3GatesComponent;
  let fixture: ComponentFixture<D3GatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3GatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3GatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

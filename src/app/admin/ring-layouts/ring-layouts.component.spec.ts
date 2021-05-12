import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RingLayoutsComponent } from './ring-layouts.component';

describe('RingLayoutsComponent', () => {
  let component: RingLayoutsComponent;
  let fixture: ComponentFixture<RingLayoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RingLayoutsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RingLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

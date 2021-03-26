import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RingLayoutComponent } from './ring-layout.component';

describe('RingLayoutComponent', () => {
  let component: RingLayoutComponent;
  let fixture: ComponentFixture<RingLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RingLayoutComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VbaNewsletterComponent } from './vba-newsletter.component';

describe('VbaNewsletterComponent', () => {
  let component: VbaNewsletterComponent;
  let fixture: ComponentFixture<VbaNewsletterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VbaNewsletterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VbaNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

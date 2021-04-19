import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmakerNewComponent } from './bookmaker-new.component';

describe('BookmakerNewComponent', () => {
  let component: BookmakerNewComponent;
  let fixture: ComponentFixture<BookmakerNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookmakerNewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmakerNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

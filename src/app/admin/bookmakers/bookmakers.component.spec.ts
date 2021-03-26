import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmakersComponent } from './bookmakers.component';

describe('BookmakersComponent', () => {
  let component: BookmakersComponent;
  let fixture: ComponentFixture<BookmakersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookmakersComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

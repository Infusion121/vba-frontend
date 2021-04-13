import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmakersFormComponent } from './bookmakers-form.component';

describe('BookmakersFormComponent', () => {
  let component: BookmakersFormComponent;
  let fixture: ComponentFixture<BookmakersFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmakersFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmakersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSheetsComponent } from './info-sheets.component';

describe('InfoSheetsComponent', () => {
  let component: InfoSheetsComponent;
  let fixture: ComponentFixture<InfoSheetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InfoSheetsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

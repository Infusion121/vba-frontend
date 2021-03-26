import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RvlInfoSheetComponent } from './rvl-info-sheet.component';

describe('RvlInfoSheetComponent', () => {
  let component: RvlInfoSheetComponent;
  let fixture: ComponentFixture<RvlInfoSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RvlInfoSheetComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RvlInfoSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

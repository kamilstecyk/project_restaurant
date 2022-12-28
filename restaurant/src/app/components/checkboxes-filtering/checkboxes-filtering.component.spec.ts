import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxesFilteringComponent } from './checkboxes-filtering.component';

describe('CheckboxesFilteringComponent', () => {
  let component: CheckboxesFilteringComponent;
  let fixture: ComponentFixture<CheckboxesFilteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxesFilteringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxesFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

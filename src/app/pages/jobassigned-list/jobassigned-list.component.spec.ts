import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobassignedListComponent } from './jobassigned-list.component';

describe('JobassignedListComponent', () => {
  let component: JobassignedListComponent;
  let fixture: ComponentFixture<JobassignedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobassignedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobassignedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobassignedComponent } from './jobassigned.component';

describe('JobassignedComponent', () => {
  let component: JobassignedComponent;
  let fixture: ComponentFixture<JobassignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobassignedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobassignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

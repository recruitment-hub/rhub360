import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditjobComponent } from './addeditjob.component';

describe('AddeditjobComponent', () => {
  let component: AddeditjobComponent;
  let fixture: ComponentFixture<AddeditjobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeditjobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

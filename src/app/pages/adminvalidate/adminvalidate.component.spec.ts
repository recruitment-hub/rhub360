import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminvalidateComponent } from './adminvalidate.component';

describe('AdminvalidateComponent', () => {
  let component: AdminvalidateComponent;
  let fixture: ComponentFixture<AdminvalidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminvalidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminvalidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

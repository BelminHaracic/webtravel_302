import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDestComponent } from './AdminDestComponent';

describe('AdminDestComponent', () => {
  let component: AdminDestComponent;
  let fixture: ComponentFixture<AdminDestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToSComponent } from './to-s.component';

describe('ToSComponent', () => {
  let component: ToSComponent;
  let fixture: ComponentFixture<ToSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

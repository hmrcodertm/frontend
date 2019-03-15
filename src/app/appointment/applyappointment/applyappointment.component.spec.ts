import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyappointmentComponent } from './applyappointment.component';

describe('ApplyappointmentComponent', () => {
  let component: ApplyappointmentComponent;
  let fixture: ComponentFixture<ApplyappointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyappointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

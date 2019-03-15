import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageappointmentComponent } from './manageappointment.component';

describe('ManageappointmentComponent', () => {
  let component: ManageappointmentComponent;
  let fixture: ComponentFixture<ManageappointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageappointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

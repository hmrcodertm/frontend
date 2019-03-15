import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateappointmentComponent } from './createappointment.component';

describe('CreateappointmentComponent', () => {
  let component: CreateappointmentComponent;
  let fixture: ComponentFixture<CreateappointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateappointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

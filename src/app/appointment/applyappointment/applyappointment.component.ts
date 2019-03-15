import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { AppointmentsService } from '../appointments.service';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-applyappointment',
  templateUrl: './applyappointment.component.html',
  styleUrls: ['./applyappointment.component.scss']
})
export class ApplyappointmentComponent implements OnInit {

  @Input() appointment: any = null;
  constructor(private LS: LoginService, private APPS: AppointmentsService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { AppointmentsService } from '../appointments.service';

@Component({
  selector: 'app-createappointment',
  templateUrl: './createappointment.component.html',
  styleUrls: ['./createappointment.component.scss']
})
export class CreateappointmentComponent implements OnInit {

  constructor(private LS: LoginService, private APPS: AppointmentsService) { 
  }

  ngOnInit() {
  }

}

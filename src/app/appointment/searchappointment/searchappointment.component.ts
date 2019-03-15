import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { AppointmentsService } from '../appointments.service';

@Component({
  selector: 'app-searchappointment',
  templateUrl: './searchappointment.component.html',
  styleUrls: ['./searchappointment.component.scss']
})
export class SearchappointmentComponent implements OnInit {

  constructor(private LS: LoginService, private APPS: AppointmentsService) { }
  searchList: any=[];
  ngOnInit() {

  }
  search(Name){
    this.APPS.searchAppointment(Name).subscribe((data) => {
      this.searchList = data;
    });
  }

}

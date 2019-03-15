import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { AppointmentsService } from '../appointments.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-manageappointment',
  templateUrl: './manageappointment.component.html',
  styleUrls: ['./manageappointment.component.scss']
})
export class ManageappointmentComponent implements OnInit {

  pk;
  appointment: any = null;
  appointmentRegisterList: any = [];
  currentAppointee:any = {};
  started=false;
  paused=false;
  time_count=0;
  time_paused=0;
  constructor(private LS: LoginService, private APPS: AppointmentsService, private router: Router,
              private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef) {
      LS.addChild(this);
  }

  ngOnInit() {
    this.pk = this.activatedRoute.snapshot.params['id'];
    this.APPS.getAppointment(this.pk).subscribe(data => {
      data['time_begin'] = new Date(data['time_begin']).toISOString().substring(0, 16);
      data['time_end'] = new Date(data['time_end']).toISOString().substring(0, 16);
      this.appointment = data;
      // now getting all appointments
      for(let x of data['registered_users']){
          this.APPS.getAppointmentRegister(x).subscribe(data2=>{
            data2['approx_time'] = new Date(data2['approx_time'].slice(0,data2['approx_time'].length-1));
            this.appointmentRegisterList.push(data2);

            if(data['registered_users'].indexOf(x)==data['registered_users'].length-1){
              this.appointmentRegisterList.sort(function(a,b){
                return a['line_index']-b['line_index'];
              });
              this.getCurrentAppointee();
          }
        })
      }
    })
    var self=this;
    setInterval(()=>{self.tick(self)}, 1000);
  }
  getCurrentAppointee(){
    // check from top to bottom to find where status = 0
    for(let x of this.appointmentRegisterList){
      if(x.status==0){
        this.LS.http.get(x.registered_user, {headers:this.LS.getHeaders()}).subscribe(data=>{
          data['info']=JSON.parse(data['info']);
          this.currentAppointee['registered_details']=x;
          this.currentAppointee['user']=data;
        });
        break;
      }
    }
  }
  update(name, time_begin, time_end){
    this.APPS.updateAppointment(this.appointment.url, name, time_begin, time_end).subscribe(
      data=>{
        data['time_begin'] = new Date(data['time_begin']).toISOString().substring(0, 16);
      data['time_end'] = new Date(data['time_end']).toISOString().substring(0, 16);
      this.appointment = data;
      }
    )
  }
  apply(name){
    this.APPS.applyAppointment(this.appointment.url, name).subscribe(data => {
      console.log(data);
      this.appointmentRegisterList.push(data);
    })
  }
  refresh(){
    this.cdr.detectChanges();
  }
  now:any = null;
  tick(self){
    self.now=new Date();
    if(self.started && !self.paused) self.time_count++;
    else if(self.started && self.paused) self.time_paused++;
  }
  startAppointing(){
    this.getCurrentAppointee();
    this.started=true;
  }
  appointeeComplete(){
    this.started=false;
    this.LS.http.post(
      this.currentAppointee['registered_details'].url+'complete/',
      new HttpParams().set("time_spent", this.time_count+"")
      .set("time_paused", this.time_paused+""),
      {
        headers: this.LS.getHeaders()
      }
    ).subscribe(data =>{
      console.log(data) ;
      
    })

  }

}

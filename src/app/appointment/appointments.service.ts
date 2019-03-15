import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  appointments = {};
  constructor(private LS: LoginService) {
    
  }
  public createAppointment(Name: string){
    this.LS.http.post(
      this.LS.serverurl + 'api/auth/appointments/',
      new HttpParams().set('name', Name),
      {
        headers: this.LS.getHeaders()
      }).subscribe((data) => {
            console.log(data);
      });
  }
  public searchAppointment(Name: string){
    return this.LS.http.get(
      this.LS.serverurl + 'api/auth/appointments/search/?key='+Name,
      {
        headers: this.LS.getHeaders()
      });
  }
  public getAppointment(pk){
    return this.LS.http.get(
      this.LS.serverurl+'api/auth/appointments/'+pk+'/',
      {
        headers: this.LS.getHeaders()
      }
    );
  }
  public applyAppointment(appointment_url, name){
    return this.LS.http.post(
      this.LS.serverurl + 'api/auth/appointmentregister/',
      new HttpParams().set("appointment", appointment_url)
        .set("details", name),
        {
          headers: this.LS.getHeaders()
        }
    )
  }
  public getAppointmentRegister(appointmentRegisterUrl){
    return this.LS.http.get(
      appointmentRegisterUrl,
      {
        headers: this.LS.getHeaders()
      }
    );
  }
  public updateAppointment(url, name, time_begin, time_end){
    return this.LS.http.patch(
      url,
      new HttpParams().set("name", name)
        .set("time_begin", time_begin)
        .set("time_end", time_end),
      {
        headers: this.LS.getHeaders()
      }
    );
  }
  
}

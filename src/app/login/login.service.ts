import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

//var $:any;
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public serverurl:string="https://hashappoint.herokuapp.com/";
  public data={
    user:null,
    token:null
  }
  public is_staff = false;
  public islogged = false;
  public verified = false;
  public after_verify:any=[];

  constructor(public http:HttpClient){
    // this.serverurl="http://localhost:8000/";
    // check if user details present or not
      var token = localStorage.getItem('auth_token');
      //user = localStorage.getItem('auth_user');
      if(token==null){
        // user is not logged
        this.islogged = false;
        this.verified = true;
      } else {
        this.check_user(token);
      }
  }
  check_user(token, self=this){
    // check the server for user details
    this.http.get(this.serverurl+'api/auth/user2/status/', {
      headers: new HttpHeaders().set('Authorization', 'Token '+token)
      }).subscribe(data=>{
          try{
          self.is_staff = data['is_staff'];
          console.log("Status found from server: ", data);
          self.data.token=token;
          self.data.user = data['user'];
          self.data.user.info = JSON.parse(data['user'].info);
          self.islogged = true;
          localStorage.setItem('auth_token', token);
          console.log(self.data.user);
          self.refresh();
          } catch(e){
            console.log(e);
          }
        }, error => {
          console.log('errors occured', error);
          self.islogged=false;
          // remove un-necessary token
          localStorage.removeItem('auth_token');
          self.verified = true;
        }, ()=>{
          self.verified = true;
          console.log("User is verified now ")
          for(let x of self.after_verify){
            x();
          }
          self.after_verify=[];
        });
  }
  google_signup(id_token, self=this){
    if(this.islogged){
      // already logged in
      alert("You must logout before creating any new account");
    } else {
      // rest is same as google login
      this.google_login(id_token, self);
    }
  }
  google_login(id_token, self=this){
    // login only if verified == true
    console.log('Google Login called', self.verified, self.islogged)
    if(self.verified == false){
      console.log("User is not verified from server yet, so pushing the login to queue");
      self.after_verify.push(()=>{self.google_login(id_token);})
    } else {
      // user is verified
      if(self.islogged){
        console.log("user is already logged in, aborting!!!");
      } else {
        // its verified that user is not logged, so googl loging in now...
        //console.log('I was here');
        self.verified=false;
        self.http.post(self.serverurl+'api/googlelogin/', new HttpParams().set('id_token', id_token), {
        }).subscribe(data=>{
            self.check_user(data['token']);
        })
      }
    }
  }
  onLoginSuccess(token){
    this.islogged=true;
  }
  up_login(username, password){
    if(this.islogged) {
      alert("User is already logged!!");
    }
  }
  logout(after=()=>{}){
    this.http.post(this.serverurl+'api/logout/',{}, {headers:this.getHeaders()}).subscribe(data=>{
      after();
      console.log("After logout, result fetched from server");
      this.islogged=false;
      this.data.user=null;
      this.refresh();
    })
  }
  public getHeaders(){
    if(this.islogged)
    return new HttpHeaders().set("Authorization", "Token "+ this.data.token);
    else return new HttpHeaders();
  }
  login(){

  }
  
  
  
  
  //refresh childs
  
  child_elements=[];
  refresh(){
    for(let x in this.child_elements){
      this.child_elements[x].refresh();
    }
  }
  addChild(x:any){
    if(this.child_elements.indexOf(x)==-1){
      this.child_elements.push(x);
    }
  }
}


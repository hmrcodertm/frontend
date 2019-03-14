import { Injectable, ChangeDetectorRef } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  startApp
  users:any=[]
  initialized=false;
  constructor(public http:HttpClient,private LS:LoginService) { 
    console.log("AC was called");
    
    var self = this;
    if(this.initialized) return;
    this.initialized=true;
    this.startApp = function () {
      window['gapi'].load('auth2', function () {
        window['auth2'] = window['gapi'].auth2.init({
          client_id: '373414904977-n4id010pcju9nb7e8hj992ceph90ag1l.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        window['auth2'].isSignedIn.listen((val)=>{self.signinChanged(val,self)});
        window['auth2'].currentUser.listen(val=>self.userChanged(val, self));
        if(window['auth2'].isSignedIn.get()==true){
          // check login service that if user is logged or not
          if(self.LS.islogged){
            // nothing to do from server side
          } else {
            // user not already logged, so google login now note: login can still be denied from LS
            console.log("Calling login");
            self.LS.google_login(window['auth2'].currentUser.get().getAuthResponse().id_token);
          } 
        }
      });
    };
    console.log("Service called once");
    
  }
  getAllUsers(){
    
  }
  signinChanged(val, self){
    /**
     * on refresh if
     *  user is logged : it will be called
     *  user is not logged : it wont be called
     * on login change: it will be called
     */
    console.log("I was called", val);
    try{
    if(val){
      // user is signed in
      self.LS.google_login(window['auth2'].currentUser.get().getAuthResponse().id_token);
    } else {
      // user is logged out, first logout from LS
    }
    } catch(e) {console.log(e);}
  }
  google_success(googleUser) {
    console.log(googleUser);
  }
  google_failed(error) {
    console.log(error);
  }
  logout(){
    console.log("AC logout called");
    
    window['auth2'].signOut();
    this.LS.logout((()=>{
      console.log("Logging out from");
    }))
    
  }
  login(){
    // check if google already logged? then logout
    if(window['auth2'].isSignedIn.get()) window['auth2'].signOut();
    window['auth2'].signIn();
  }
  userChanged(val, self){
    if(!val.isSignedIn()) {
      self.user=null;
      self.islogged=false;
      return;
    }
  }
}

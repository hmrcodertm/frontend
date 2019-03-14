import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AccountService } from './account.service';
import { LoginService } from '../login.service';
//import { AccountService } from '../about/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @Input() show: any;
  
  constructor(private cdr:ChangeDetectorRef, private AC:AccountService, private LS:LoginService) { 
    LS.addChild(this);  
  }
  ngOnInit() { 
  }
  ngAfterViewInit() {
    this.AC.startApp();
  }
  refresh(){
    this.cdr.detectChanges();
    console.log(this.LS.islogged, "\n CDR was called account component")
  }
}

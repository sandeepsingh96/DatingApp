import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model:any ={}
  
  constructor(public accountService:AccountService, private router:Router,private toastr:ToastrService){}
  ngOnInit(): void {
    
    this.accountService.currentUser$.subscribe(user => {
      console.log(user); // log the user object
    });
  }
  
  login(){
    this.accountService.login(this.model).subscribe({
      next: response => {
        this.router.navigateByUrl('/members')
        
      },
      error: error => this.toastr.error(error.error)
    })
  }
  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
    
  }

}

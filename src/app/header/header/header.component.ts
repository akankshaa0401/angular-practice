import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = this.authService.isUserLoggedIn;
  private userSub: Subscription;

  constructor(public authService:AuthService,private router:Router,private http:HttpClient
  ) {}

  ngOnInit() {
    
  }

  onLogout(){
    
    this.authService.logout().subscribe(res=>{
      console.log(res);
      
      alert('You have been logged out successfully');
      // this.router.navigate(['']);
    },err=>{
      alert("OOPS!! Something went wrong")
    })
  }
  
  ngOnDestroy() {
    
  }
}

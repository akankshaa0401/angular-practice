
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  submitted=false;
  error:string=null;
loginForm: FormGroup = new FormGroup({})
  constructor(public authService: AuthService,private fb: FormBuilder,private router: Router) { }
  // constructor(private formbuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
   this.loginForm = this.fb.group({
     email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
    });
  }
  onSubmit() {
   console.log(this.loginForm)
   this.submitted=true;
   if(this.loginForm.valid){
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe((res) =>{
      console.log(res)
      this.router.navigate(["home"])
    },err=>{
      console.log(err);
    //  this.authService.handleError(err);
  this.error= this.authService.handleError(err);
  
    })
   }
  }
}
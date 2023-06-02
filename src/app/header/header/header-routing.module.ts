import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/authentication/login/login.component';
import { SignupComponent } from 'src/app/authentication/signup/signup.component';

const routes: Routes = [
    // {path:"/login",component:LoginComponent},
    // {path:"/signup",component:SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }

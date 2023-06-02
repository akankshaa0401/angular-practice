import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { AuthGuardService } from './authentication/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'home',component:HomeComponent},
  {path:'auth',loadChildren:()=>import('./authentication/auth.module').then(m=>m.AuthModule)},
  {path:'course',loadChildren:()=>import('./courses/courses/courses.module').then(m=>m.CoursesModule),canActivate : [AuthGuardService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

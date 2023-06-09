import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isUserLoggedIn: boolean = false;
    isLoading$ = new Subject<boolean>();

    // private userSubject: BehaviorSubject<User>;
    // public user: Observable<User>;

    constructor(private http: HttpClient, 
         private router: Router,)
     { }

     show(): void {
        this.isLoading$.next(true);
      }
      hide(): void {
        this.isLoading$.next(false);
      }
      
    handleError(errorRes: HttpErrorResponse) {
        console.log('handleerror');
        if (!errorRes.error || !errorRes.error.error) {
            return throwError('An unknown error occurred!');
        } else {
            return  errorRes.error.message
        }
    }

    signup(
        email: string,
        password: string,
        confirmPass: string,
        gender: string,
        name: string,
        birthdate?: any,
        photo?: File) {

        console.log("signup function")
        console.log("signup function", photo)
        console.log("signup function", birthdate)
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('passwordConfirm', confirmPass);
        formData.append('birthDate', birthdate);
        formData.append('gender', gender);
        formData.append('name', name);
        formData.append('photo', photo);
        return this.http.post(
            environment.APIKey + 'api/v1/users/signUp', formData)
            .pipe(map((res: Response) => {
                console.log(res);
                
            }))
    }

    login(email: string, password: string) {
        
        console.log("loginfunction")
        // headers:new HttpHeaders().set('content-type','application/json').set('Access-Control-Allow-Origin','*');

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }),
            withCredentials: true
           };
       
        const body = ({email:email,password:password});
        return this.http.post(
            environment.APIKey + 'api/v1/users/login',body,{observe:'response'})
            .pipe(map((res:HttpResponse<any>) => {
                console.log(res);
                console.log(res.headers.getAll('set-cookie'));
                this.isUserLoggedIn=true
               
            }))
    }

    logout(){
        return this.http.post(
            environment.APIKey + 'api/v1/users/logout'
            ,{ responseType: 'text' }
          ).pipe(map((res:Response)=>{
          }))
    }
}
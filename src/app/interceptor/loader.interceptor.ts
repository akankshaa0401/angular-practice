import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private authService:AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService.show();
    return next.handle(req).pipe(
      finalize(() => {
        this.authService.hide();
      }));
  }
}
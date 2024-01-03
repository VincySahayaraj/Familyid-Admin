import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router,private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authToken,  
      },
    })
    // return next.handle(req);
    return next.handle(req).pipe( tap(() => {},
    (err: any) => {
    if (err instanceof HttpErrorResponse) {
      if (err.status !== 401) {
       return;
      }
      this.router.navigate(['login']);
    }
  }));
}
  
}

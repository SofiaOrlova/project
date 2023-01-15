import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    let headers = request.headers.set('Content-Type', 'application/json');
    if (this.authService.accessToken && isApiUrl) {
      headers = headers.set('Authorization', `Bearer ${this.authService.accessToken}`);
    }
    request = request.clone({
      headers: headers
    });
    
    return next.handle(request);
  }
}

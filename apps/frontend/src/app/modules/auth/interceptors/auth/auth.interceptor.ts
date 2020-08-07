import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) {}

  intercept(
    originalRequest: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return from(this.authService.createHttpAuthHeader()).pipe(
      map((httpAuthHeader) =>
        httpAuthHeader
          ? originalRequest.clone({
              setHeaders: {
                Authorization: httpAuthHeader,
              },
            })
          : originalRequest
      ),
      mergeMap((request) => next.handle(request))
    );
  }
}

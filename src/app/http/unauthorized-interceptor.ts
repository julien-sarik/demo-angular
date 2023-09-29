import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpClient} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {catchError, mergeMap} from 'rxjs/operators';
import { AuthenticationService } from "../authentication/authentication.service";
 
@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient, private authService: AuthenticationService) {}
    
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        // ignoring non-401 errors
        if (error.status !== 401) {
            return throwError(() => error)
        }
        // if can't refresh tokens then re-authenticate the user
        if (req.url.endsWith('/refresh')) {
            console.log('cannot refresh token, redirecting to login...')
            // the Observable is subscribed to automatically by the 'catchError' operator
            return this.authService.login()
        }
        // ignore backends not belonging to the resource server
        if (!req.url.includes('/api/')) {
            return throwError(() => error)
        }
        // avoid infinite loop
        if (req.headers.has('retried')) {
            return throwError(() => 'unable to process request, please retry later')
        }
        console.log('refreshing token...')
        // the Observable is subscribed to automatically by the 'catchError' operator
        return this.authService.refresh()
          .pipe(
            // retry request after token has been refreshed
            mergeMap(() => this.http.request(req.clone({headers: req.headers.append('retried', 'true')})))
          )
      })
    )
  }
}
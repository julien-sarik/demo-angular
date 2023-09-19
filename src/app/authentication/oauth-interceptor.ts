import { Injectable} from '@angular/core';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { Observable,  } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { resourceServerConfig } from './resource-server.config';

@Injectable()
export class OauthInterceptor implements HttpInterceptor {
  constructor(private authStorage: OAuthStorage) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.shouldAddToken(req.url.toLowerCase())) return next.handle(req);

    let header = 'Bearer ' + this.authStorage.getItem('access_token');
    let headers = req.headers.set('Authorization', header);
    req = req.clone({ headers });

    return next.handle(req);
  }

  private shouldAddToken(url: string): boolean {
    return resourceServerConfig.urls?.find(u => url.startsWith(u)) !== undefined;
  }

}
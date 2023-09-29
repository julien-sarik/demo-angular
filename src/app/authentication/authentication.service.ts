import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bffConfig } from '../bff/bff.config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  get isAuthenticated(): boolean {
    return sessionStorage.getItem('claims') !== null
  }

  get userName(): string {
    const claims = sessionStorage.getItem('claims');
    return claims != null ? JSON.parse(claims)['preferred_username']: '';
  }

  login() {
    return this.http.post<any>(`${bffConfig.url}/login/start`, null)
      // redirect the browser using global native browser window object
      .pipe(map((resp: any) => window.location.href = resp['authorizationRequestUrl']))
  }

  logout() {
    // clear user data 
    sessionStorage.clear();
    return this.http.post<any>(`${bffConfig.url}/logout`, null)
      // redirect the user to the configured auth server's logout endpoint
      .pipe(map((resp: any) => window.location.href = resp['url']))
  }

  refresh() {
    return this.http.post<any>(`${bffConfig.url}/refresh`, null);
  }
}

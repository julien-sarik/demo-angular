import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bffConfig } from '../bff/bff.config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  get userName(): string {
    const claims = sessionStorage.getItem('claims');
    return claims != null ? JSON.parse(claims)['preferred_username']: '';
  }

  login() {
    this.http.post<any>(`${bffConfig.url}/login/start`, null)
      // redirect the browser using global native browser window object
      .subscribe(resp => window.location.href = resp['authorizationRequestUrl']);
  }

  logout() {
    // clear user data 
    sessionStorage.clear();
    this.http.post<any>(`${bffConfig.url}/logout`, null)
      // redirect the user to the configured auth server's logout endpoint
      .subscribe(resp => window.location.href = resp.url);
  }
}

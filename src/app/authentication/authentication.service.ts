import { Injectable, inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  readonly oauthService: OAuthService = inject(OAuthService)

  constructor() { }

  get userName(): string {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return '';
    return claims['given_name'];
  }

  login() {
    this.oauthService.initCodeFlow();
  }

  // get idToken(): string {
  //   return this.oauthService.getIdToken();
  // }

  // get accessToken(): string {
  //   return this.oauthService.getAccessToken();
  // }

  // refresh() {
  //   this.oauthService.refreshToken();
  // }
}

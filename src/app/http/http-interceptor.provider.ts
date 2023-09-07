/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { makeEnvironmentProviders } from '@angular/core';
import { OauthInterceptor } from '../authentication/oauth-interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = makeEnvironmentProviders([
  { provide: HTTP_INTERCEPTORS, useClass: OauthInterceptor, multi: true },
]);
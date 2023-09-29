import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { makeEnvironmentProviders } from '@angular/core';
import { UnauthorizedInterceptor } from './unauthorized-interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = makeEnvironmentProviders([
  { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true },
]);
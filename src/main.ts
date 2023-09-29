/*
*  Protractor support is deprecated in Angular.
*  Protractor is used in this example for compatibility with Angular documentation tools.
*/
import { bootstrapApplication,provideProtractorTestingSupport } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';
import { provideHttpClient, withInterceptorsFromDi, withXsrfConfiguration } from "@angular/common/http";
import { httpInterceptorProviders } from './app/http/htto-interceptors.provider';

bootstrapApplication(AppComponent,
  {
    providers: [
      provideProtractorTestingSupport(),
      provideRouter(routeConfig),
      httpInterceptorProviders,
      provideHttpClient(withInterceptorsFromDi(), withXsrfConfiguration({cookieName: 'example-csrf', headerName: 'X-example-csrf'})),
    ]
  }
).catch(err => console.error(err));
/*
*  Protractor support is deprecated in Angular.
*  Protractor is used in this example for compatibility with Angular documentation tools.
*/
import { bootstrapApplication,provideProtractorTestingSupport } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { httpInterceptorProviders } from './app/http/http-interceptor.provider';


bootstrapApplication(AppComponent,
  {
    providers: [
      provideProtractorTestingSupport(),
      provideRouter(routeConfig),
      httpInterceptorProviders,
      provideHttpClient(withInterceptorsFromDi()),
      provideOAuthClient()
    ]
  }
).catch(err => console.error(err));
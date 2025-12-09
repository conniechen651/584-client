import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; 
import { routes } from './app.routes';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authHttpInterceptorFn])
    ),
    provideAuth0({
      domain: 'dev-yl7blimqv18gp6tv.us.auth0.com',
      clientId: 'xcNuAFIjAK3Yzpq1rzLnBmtFtoxdGGgB',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://comp584server-h6g8b9bqdwfye8ab.canadacentral-01.azurewebsites.net',
        scope: 'openid read:data write:data'
      },
      httpInterceptor: {
        allowedList: [
          'http://localhost:5089/api/*',
          'https://comp584server-h6g8b9bqdwfye8ab.canadacentral-01.azurewebsites.net/api/*'

        ]
      }
    })
  ]
};

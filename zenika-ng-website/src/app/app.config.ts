import { provideHttpClient, withFetch } from '@angular/common/http';
import { WELCOME_MSG } from './app.token';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.route';
import { provideZoneChangeDetection } from '@angular/core';

export const appConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
    {
      provide: WELCOME_MSG,
      useValue: 'Bienvenue sur Zenika Ecommerce',
    },
  ],
};

import { provideHttpClient, withFetch } from '@angular/common/http';
import { WELCOME_MSG } from './app.token';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.route';
import { isDevMode, provideZoneChangeDetection } from '@angular/core';
import { appEffects, appReducers } from './shared/store';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes, withComponentInputBinding()),
        provideHttpClient(withFetch()),
        {
            provide: WELCOME_MSG,
            useValue: 'Bienvenue sur Zenika Ecommerce',
        },
        provideStore(appReducers),
        provideEffects(appEffects),
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    ],
};

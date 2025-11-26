import { provideHttpClient } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { WELCOME_MSG } from "./app.token";

export const appConfig = {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule),
        provideHttpClient(),
        {
            provide: WELCOME_MSG,
            useValue: 'Bienvenue sur Zenika Ecommerce',
        },
    ]
}
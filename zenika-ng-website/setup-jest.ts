// setup-jest.ts
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import '@angular/localize/init';

// Initialise l'environnement Zone.js pour les tests Angular
setupZoneTestEnv();
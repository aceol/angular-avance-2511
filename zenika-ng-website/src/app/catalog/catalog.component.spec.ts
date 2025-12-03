import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { AppState } from '../shared/store';
import { CatalogComponent } from './catalog.component';
import { WELCOME_MSG } from '../app.token';
import { Actions } from '@ngrx/effects';

describe('CatalogComponent', () => {
    let component: CatalogComponent;
    let fixture: ComponentFixture<CatalogComponent>;
    let actions$: Observable<Action>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CatalogComponent],
            providers: [
                provideRouter([]),
                provideMockStore<AppState>({
                    initialState: {
                        catalog: { products: [] },
                        basket: { items: [], customer: undefined },
                    },
                }),
                provideMockActions(() => actions$),
                {
                    provide: WELCOME_MSG,
                    useValue: 'Welcome to unit testing',
                },
            ],
        });

        fixture = TestBed.createComponent(CatalogComponent);
        component = fixture.componentInstance;
        actions$ = TestBed.inject(Actions);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});

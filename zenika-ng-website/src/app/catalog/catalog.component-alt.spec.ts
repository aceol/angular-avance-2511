import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
    waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { BasketService } from '../basket/basket.service';
import { MockBasketService } from '../basket/basket.service.mock';
import { CatalogComponent } from './catalog.component';
import { CatalogService } from './catalog.service';
import { MockCatalogService } from './catalog.service.mock';
import { ProductComponent } from './product/product.component';
import { WELCOME_MSG } from '../app.token';

@Component({ selector: 'app-basket', standalone: true, template: '' })
export class BasketComponent {}

describe('CatalogComponent (alt)', () => {
    let component: CatalogComponent;
    let fixture: ComponentFixture<CatalogComponent>;

    beforeEach(() => {
        // Given
        TestBed.configureTestingModule({
            imports: [CatalogComponent],
            providers: [
                provideRouter([{ path: 'basket', component: BasketComponent }]),
                {
                    provide: CatalogService,
                    useValue: MockCatalogService,
                },
                {
                    provide: BasketService,
                    useValue: MockBasketService,
                },
                {
                    provide: WELCOME_MSG,
                    useValue: 'Welcome to unit testing',
                },
            ],
        }).overrideComponent(CatalogComponent, {
            // -----------------------------------------------------------------------------------------------------
            // In this test suite, we remove the original `ProductComponent` without providing a mock replacement.
            // We simply use "CUSTOM_ELEMENTS_SCHEMA" to allow unknown HTML tags in the `CatalogComponent` template.
            //
            // But we'll still be able to test:
            //  - the `[product]` property binding
            //  - the `(addToBasket)` event binding
            //
            // on the following part of the `CatalogComponent` template:
            //   `<app-product [product]="product" (addToBasket)="addToBasket($event)" />`
            //
            // See another solution here: `catalog.component.spec`
            remove: { imports: [ProductComponent] },
            add: { schemas: [CUSTOM_ELEMENTS_SCHEMA] },
            // -----------------------------------------------------------------------------------------------------
        });

        fixture = TestBed.createComponent(CatalogComponent);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should display the products (using "DebugElement.properties[]" for property binding)', waitForAsync(async () => {
        // Given
        fixture.detectChanges();

        // When
        await fixture.whenStable();
        fixture.detectChanges();

        // Then
        const productDebugElement = fixture.debugElement.query(
            By.css('[data-test="product"]')
        );

        expect(productDebugElement).toBeInstanceOf(DebugElement);

        const product = {
            id: 'id',
            title: 'title',
            description: 'description',
            photo: 'photo',
            price: 10,
            stock: 2,
        };
        expect(productDebugElement.properties['product']).toEqual(product);
    }));

    it('should add product to basket when product is clicked (using "DebugElement.triggerEventHandler()" for event binding)', fakeAsync(() => {
        // Given
        const basketService = TestBed.inject(BasketService);
        const catalogService = TestBed.inject(CatalogService);
        fixture.detectChanges();

        tick();
        fixture.detectChanges();

        // When
        const productDebugElement = fixture.debugElement.query(
            By.css('[data-test="product"]')
        );
        const product = {
            id: 'id',
            title: 'title',
            description: 'description',
            photo: 'photo',
            price: 10,
            stock: 2,
        };
        productDebugElement.triggerEventHandler('addToBasket', product);

        tick();

        // Then
        expect(basketService.addItem).toHaveBeenCalledWith('id');
        expect(catalogService.decreaseStock).toHaveBeenCalledWith('id');
    }));
});

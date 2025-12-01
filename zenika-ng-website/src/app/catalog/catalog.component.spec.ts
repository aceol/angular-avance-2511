import expect from 'expect';
import { Component } from '@angular/core';
import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
    waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { BasketService } from '../basket/basket.service';
import { MockBasketService } from '../basket/basket.service.mock';
import { CatalogComponent } from './catalog.component';
import { CatalogService } from './catalog.service';
import { MockCatalogService } from './catalog.service.mock';
import { ProductComponent } from './product/product.component';
import { MockProductComponent } from './product/product.component.mock';
import { WELCOME_MSG } from '../app.token';

@Component({ selector: 'app-basket', standalone: true, template: '' })
export class BasketComponent {}

describe('CatalogComponent', () => {
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
            // -------------------------------------------------------------------------------------------------
            // In this test suite, we are replacing the original `ProductComponent` with `MockProductComponent`.
            // However, note that even the mock is a real Angular component.
            //
            // Thus, it will be easy to test:
            //  - the `[product]` property binding
            //  - the `(addToBasket)` event binding
            //
            // on the following part of the `CatalogComponent` template:
            //   `<app-product [product]="product" (addToBasket)="addToBasket($event)" />`
            //
            // See an alternative solution here: `catalog.component-alt.spec`
            remove: { imports: [ProductComponent] },
            add: { imports: [MockProductComponent] },
            // -------------------------------------------------------------------------------------------------
        });

        fixture = TestBed.createComponent(CatalogComponent);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should display welcome message', () => {
        // When
        fixture.detectChanges();

        // Then
        expect(
            (fixture.nativeElement as HTMLElement).querySelector(
                '[data-test="welcome"]'
            )?.textContent
        ).toContain('Welcome to unit testing');
    });

    it('should display total price with currency', waitForAsync(async () => {
        // When
        fixture.detectChanges();

        await fixture.whenStable();
        fixture.detectChanges();

        // Then
        expect(
            (fixture.nativeElement as HTMLElement).querySelector(
                '[data-test="total"]'
            )?.textContent
        ).toContain('€0.00');
    }));

    it('should navigate to the basket view when clicking on "Go to basket" button', waitForAsync(async () => {
        // Given
        const router = TestBed.inject(Router);
        fixture.detectChanges();

        // When
        (fixture.nativeElement as HTMLElement)
            .querySelector<HTMLAnchorElement>('[data-test="goToBasket"]')
            ?.click();
        await fixture.whenStable();

        // Then
        expect(router.url).toBe('/basket');
    }));

    it('should display the products', waitForAsync(async () => {
        // Given
        fixture.detectChanges();

        // When
        await fixture.whenStable();
        fixture.detectChanges();

        // Then
        expect(
            (fixture.nativeElement as HTMLElement).querySelectorAll(
                '[data-test="product"]'
            )
        ).toHaveLength(1);

        const productComponent: ProductComponent = fixture.debugElement.query(
            By.directive(ProductComponent)
        ).componentInstance;

        const product = {
            id: 'id',
            title: 'title',
            description: 'description',
            photo: 'photo',
            price: 10,
            stock: 2,
        };
        expect(productComponent.product).toEqual(product);
    }));

    it('should add product to basket when product is clicked', fakeAsync(() => {
        // Given
        const basketService = TestBed.inject(BasketService);
        const catalogService = TestBed.inject(CatalogService);
        fixture.detectChanges();

        tick();
        fixture.detectChanges();

        // When
        const productComponent: ProductComponent = fixture.debugElement.query(
            By.directive(ProductComponent)
        ).componentInstance;
        productComponent.addToBasket.emit(productComponent.product);

        tick();

        // Then
        expect(basketService.addItem).toHaveBeenCalledWith('id');
        expect(catalogService.decreaseStock).toHaveBeenCalledWith('id');
    }));
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
    let component: ProductComponent;
    let fixture: ComponentFixture<ProductComponent>;
    let nativeElement: HTMLElement;

    beforeEach(() => {
        // Given
        TestBed.configureTestingModule({
            imports: [ProductComponent],
            providers: [provideRouter([])],
        });

        fixture = TestBed.createComponent(ProductComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement as HTMLElement;

        component.product = {
            id: 'id',
            title: 'title',
            description: 'description',
            photo: 'photo',
            price: 10,
            stock: 2,
        };
    });

    it('should be created', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should display product photo and description', () => {
        // When
        fixture.detectChanges();

        // Then
        expect(
            nativeElement.querySelector<HTMLImageElement>('[data-test="photo"]')
                ?.src
        ).toContain('photo');
        expect(
            nativeElement.querySelector('[data-test="description"]')
                ?.textContent
        ).toContain('description');
    });

    it('should display product title in uppercase', () => {
        // When
        fixture.detectChanges();

        // Then
        expect(
            nativeElement.querySelector('[data-test="title"]')?.textContent
        ).toContain('TITLE');
    });

    it('should display product price with currency', () => {
        // When
        fixture.detectChanges();

        // Then
        expect(
            nativeElement.querySelector('[data-test="price"]')?.textContent
        ).toContain('€10.00');
    });

    it('should NOT display warning when product stock is greater than 1', () => {
        // When
        fixture.detectChanges();

        // Then
        expect(
            nativeElement.querySelector('[data-test="container"]')?.className
        ).not.toContain('text-bg-warning');
    });

    it('should display warning when product stock is equal to 1', () => {
        // Given
        component.product = { ...component.product, stock: 1 };

        // When
        fixture.detectChanges();

        // Then
        expect(
            nativeElement.querySelector('[data-test="container"]')?.className
        ).toContain('text-bg-warning');
    });

    it('should emit product when clicking on the button', () => {
        // Given
        const addToBasketEmit = spyOn(component.addToBasket, 'emit');
        expect(addToBasketEmit).not.toHaveBeenCalled();
        fixture.detectChanges();

        // When
        nativeElement
            .querySelector<HTMLButtonElement>('[data-test="addToBasket"]')
            ?.click();

        // Then
        expect(addToBasketEmit).toHaveBeenCalledWith(component.product);
    });

    // NOTE: see `./wrap-product.component.spec.ts` for a solution :)
    it('should NOT work when calling "detectChanges" more than once, due to "OnPush" limitation', () => {
        // Given
        fixture.detectChanges();
        expect(
            nativeElement.querySelector('[data-test="container"]')?.className
        ).not.toContain('text-bg-warning');

        // When
        component.product = { ...component.product, stock: 1 };
        fixture.detectChanges(); // Oops! Calling `detectChanges` more than once does NOT work when changing component input programatically

        // Then
        expect(
            nativeElement.querySelector('[data-test="container"]')?.className
        ).not.toContain('text-bg-warning');
    });
});

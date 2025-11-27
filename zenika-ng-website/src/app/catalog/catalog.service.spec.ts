import { TestBed } from '@angular/core/testing';

import { CatalogService } from './catalog.service';
import { ApiService } from '../shared/services/api.service';
import { MockApiService } from '../shared/services/api.service.mock';
import { firstValueFrom } from 'rxjs';
import { Product } from './product/product.types';

describe('CatalogService', () => {
    let service: CatalogService;

    beforeEach(() => {
        // Given
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: ApiService,
                    useValue: MockApiService,
                },
            ],
        });
        service = TestBed.inject(CatalogService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should store the products after fetching them', async () => {
        // Given
        let products = await firstValueFrom(service.products$);
        expect(products).toHaveSize(0);

        // When
        await firstValueFrom(service.fetch());

        // Then
        products = await firstValueFrom(service.products$);
        expect(products).toHaveSize(1);
        expect(products).toEqual([
            {
                id: 'id',
                title: 'title',
                description: 'description',
                photo: 'photo',
                price: 10,
                stock: 2,
            },
        ]);
    });

    it('should decrease the product stock', async () => {
        // Given
        await firstValueFrom(service.fetch());

        // When
        service.decreaseStock('id');

        // Then
        const products = await firstValueFrom(service.products$);
        expect(products).toEqual([
            {
                id: 'id',
                title: 'title',
                description: 'description',
                photo: 'photo',
                price: 10,
                stock: 1,
            },
        ]);
    });

    it('should know that stock is empty', async () => {
        // Given
        await firstValueFrom(service.fetch());
        expect(await firstValueFrom(service.isStockEmpty$)).toBeFalse();

        // When
        service.decreaseStock('id');
        service.decreaseStock('id');

        // Then
        expect(await firstValueFrom(service.isStockEmpty$)).toBeTrue();
    });

    it('should return product availability', async () => {
        expect(service.isAvailable({ stock: 1 } as Product)).toBeTrue();
        expect(service.isAvailable({ stock: 0 } as Product)).toBeFalse();
    });
});

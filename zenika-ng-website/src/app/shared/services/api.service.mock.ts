import mock from 'jest-mock';
import { of } from 'rxjs';
import { BasketItem } from '../../basket/basket.types';
import { Product } from '../../catalog/product/product.types';
import { ApiService } from './api.service';

export const MockApiService: Partial<ApiService> = {
    getProducts: jest.fn(() =>
        of([
            {
                id: 'id',
                title: 'title',
                description: 'description',
                photo: 'photo',
                price: 10,
                stock: 2,
            },
        ] as Product[])
    ),

    getProduct: jest.fn(() =>
        of({
            id: 'id',
            title: 'title',
            description: 'description',
            photo: 'photo',
            price: 10,
            stock: 2,
        } as Product)
    ),

    getBasket: jest.fn(() => of([] as BasketItem[])),

    addToBasket: jest.fn(() =>
        of({ id: 'id', title: 'title', price: 10 } as BasketItem)
    ),

    checkoutBasket: jest.fn(() => of({ orderNumber: 1 })),
};

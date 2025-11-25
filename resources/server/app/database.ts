import { Product } from './types';

export const getProducts = (): Product[] => [
  {
    id: 'welsch',
    title: 'Coding the welsch',
    description: 'Tee-shirt col rond - Homme',
    photo: 'http://localhost:8080/assets/coding-the-welsch.jpg',
    price: 20,
    stock: 2,
  },
  {
    id: 'world',
    title: 'Coding the world',
    description: 'Tee-shirt col rond - Homme',
    photo: 'http://localhost:8080/assets/coding-the-world.jpg',
    price: 18,
    stock: 2,
  },
  {
    id: 'vador',
    title: 'Duck Vador',
    description: 'Tee-shirt col rond - Femme',
    photo: 'http://localhost:8080/assets/coding-the-stars.jpg',
    price: 21,
    stock: 2,
  },
  {
    id: 'snow',
    title: 'Coding the snow',
    description: 'Tee-shirt col rond - Femme',
    photo: 'http://localhost:8080/assets/coding-the-snow.jpg',
    price: 19,
    stock: 2,
  },
];

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { config } from './config';
import { getProducts } from './database';
import { BasketItem, Product } from './types';

const app = express();
const server = http.createServer(app);

const { context, port } = config;

// ---- assets ----

app.use('/assets', express.static('app/assets'));

// ---- api ----

let products: Product[] = getProducts();
let basket: BasketItem[] = [];
let orderNumber = 0;

app.use(bodyParser.json());
app.use(cors());

// ----- products -----

// Get all products
app.get(`${context}/products`, (_req, res) => {
  res.send(products.filter(({ stock }) => stock > 0));
});

// Get one product by id
app.get(`${context}/products/:id`, (req, res) => {
  const product = products.find((product) => product.id == req.params.id);
  if (!product) {
    res.status(404).send();
    return;
  }
  res.send(product);
});

// ----- basket -----

// Get the basket
app.get(`${context}/basket`, (_req, res) => {
  res.send(basket);
});

// Add a product to the basket and decrease the stock of this product
app.post(`${context}/basket`, (req, res) => {
  const { productId } = req.body;
  const product = products.find(({ id }) => id === productId);

  if (!product || product.stock === 0) {
    res.status(400).send({ error: true });
    return;
  }

  const { id, title, price } = product;
  const basketItem: BasketItem = { id, title, price };

  basket.push(basketItem);

  products = products.map((product) => {
    if (product.id === basketItem.id) {
      product.stock -= 1;
    }
    return product;
  });

  res.status(201).send(basketItem);

  console.log(`\nAdded BasketItem ID: "${basketItem.id}"`);
});

// Checkout the order and reset the basket
app.post(`${context}/basket/checkout`, (req, res) => {
  if (basket.length === 0) {
    res.status(400).send({ error: true });
    return;
  }

  const infos = [
    `\nOrder: ${++orderNumber}`,
    `Price: ${basket.reduce((total, { price }) => total + price, 0)}€`,
    `Name: ${req.body.name}`,
    `Address: ${req.body.address}`,
    `Credit card: ${req.body.creditCard}`,
  ];
  console.log(infos.join('\n'));

  basket = [];
  res.status(200).send({ orderNumber });
});

// ----- reset -----

// Reset the products and the basket
app.get('/reset', (_req, res) => {
  basket = [];
  products = getProducts();
  res.status(200).send({ reset: true });

  console.log('\n*** Server data has been reset ***');
});

// ----- ping -----

// Ping the server
app.get('/', (_req, res) => {
  res.status(200).send({ ok: true });
});

server.listen(port);

const serverUrl = `http://localhost:${port}`;

console.log('REST API Server for "Zenika Ecommerce" App');
console.log('------------------------------------------');
console.log(`\n- Express server is listening on:\n\t${serverUrl}/`);
console.log(`\n- Get products on:\n\t${serverUrl}${context}/products`);
console.log(`\n- Reset products on:\n\t${serverUrl}/reset`);

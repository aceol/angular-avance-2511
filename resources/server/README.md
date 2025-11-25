# REST API Server for "Zenika Ecommerce" App

## API

### Get all products

```shell
GET http://localhost:8080/api/products
```

### Get one product by id

```shell
GET http://localhost:8080/api/products/:id
```

### Get the basket

```shell
GET http://localhost:8080/api/basket
```

### Add a product to the basket and decrease the stock of this product

```shell
POST http://localhost:8080/api/basket
```

### Checkout the order and reset the basket

```shell
POST http://localhost:8080/api/basket/checkout
```

## Utility

### Reset the products and the basket

```shell
GET http://localhost:8080/reset
```

### Ping the server

```shell
GET http://localhost:8080/
```

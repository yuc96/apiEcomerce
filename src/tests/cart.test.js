const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const sequelize = require('../utils/connection');

let cartId;
let token;
let cart = {
  quantity: 2,
};

// Prueba para el inicio de sesión
test('Test Loading', async () => {
  const loginResponse = await request(app)
    .post('/users/login')
    .send({ email: 'testuser@gmail.com', password: '1235678' });

  token = loginResponse.body.token;
  cartId = loginResponse.body.user.id;
  expect(loginResponse.status).toBe(200);
  console.log(loginResponse.body.user);
});

describe('Cart CRUD', () => {
  // Prueba para crear un carrito
  test('should create a new cart', async () => {
    const response = await request(app)
      .post('/cart')
      .send(cart)
      .set('Authorization', `Bearer ${token}`);
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    cartId = response.body.id;
    console.log(cartId);
    console.log(response.body);
  });

  // Prueba para obtener un carrito
  test('should get a cart', async () => {
    const response = await request(app)
      .get(`/cart/${cartId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(cartId);
    expect(response.body.quantity).toBe(cart.quantity);
  });

  // Prueba para actualizar un carrito
  test('should update a cart', async () => {
    const response = await request(app)
      .put(`/cart/${cartId}`)
      .send({ quantity: 5 })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(cartId);
    expect(response.body.quantity).toBe(5);
  });

  // Prueba para eliminar un carrito
  test('should delete a cart', async () => {
    const response = await request(app)
      .delete(`/cart/${cartId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});

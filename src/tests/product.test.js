const request = require('supertest');
const app = require('../app'); 
const jwt = require('jsonwebtoken');
const sequelize = require('../utils/connection');


let productId;
let token;
let product = {
    
        title: "Tv 65 pulgadas",
        description: "Smart TV Marca Hyunday",
        brand: "Samsung",
        price: "800"
    
};

// Test para el login
test('Test Loading', async () => {
  const loginResponse = await request(app)
    .post('/users/login')
    .send({ email: 'testuser@gmail.com', password: '1235678' });

  token = loginResponse.body.token;
  productId=loginResponse.body.user.id;
  expect(loginResponse.status).toBe(200);
  console.log(loginResponse.body.user);
});

describe('Product CRUD', () => {
  // Test para crear un producto
  test('should create a new product', async () => {
    const response = await request(app)
      .post('/product')
      .send(product)
      .set('Authorization', `Bearer ${token}`);
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    productId = response.body.id;
    console.log(productId);
    console.log(response.body);
  });

  // Test para obtener un producto
  test('should get a product', async () => {
    const response = await request(app)
      .get(`/product/${productId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(productId);
    expect(response.body.title).toBe(product.title);
  });

  // Test para actualizar un producto
  test('should update a product', async () => {
    const response = await request(app)
      .put(`/product/${productId}`)
      .send({ title: 'Updated product' })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(productId);
    expect(response.body.title).toBe('Updated product');
  });

  // Test para eliminar un producto
  test('should delete a product', async () => {
    const response = await request(app)
      .delete(`/product/${productId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});


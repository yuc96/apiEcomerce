const request = require('supertest');
const app = require('../app'); 
const jwt = require('jsonwebtoken');
const sequelize = require('../utils/connection');

let categoryId;
let token;  
let name = "Cine";

// Test para el login
test('Test Loading', async () => {
  const loginresponse = await request(app)
    .post('/users/login')
    .send({ email: 'testuser@gmail.com', password: '1235678' });

  token = loginresponse.body.token;
  categoryId = loginresponse.body.user.id;
  expect(loginresponse.status).toBe(200);
  console.log(loginresponse.body.user);
});

describe('Category CRUD', () => {
  // Test para crear una categoría
  test('should create a new category', async () => {  
    const response = await request(app)
      .post('/category')
      .send({ name })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    categoryId = response.body.id;
    console.log(categoryId);
    console.log(response.body);
  });

  // Test para obtener una categoría
  test('should get a category', async () => {
    const response = await request(app)
      .get(`/category/${categoryId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(categoryId);
    expect(response.body.name).toBe(name);
  });

  // Test para actualizar una categoría
  test('should update a category', async () => {
    const response = await request(app)
      .put(`/category/${categoryId}`)
      .send({ name: 'Updated category' })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(categoryId);
    expect(response.body.name).toBe('Updated category');
  });

  // Test para eliminar una categoría
  test('should delete a category', async () => {
    const response = await request(app)
      .delete(`/category/${categoryId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});

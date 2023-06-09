const request = require('supertest');
const app = require('../app'); 
const jwt = require('jsonwebtoken');

describe('User CRUD', () => {
  let createdUserId;
  let token;  
  const user = 
    { 
        firstName: "Mateo",
        lastName: "Salazar",
        email: "salazars9bg@gmail.com",
        password: "1235468qwsd"
    }; 

  // Test para crear un usuario
  test('should create a new user', async () => {  
    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdUserId = response.body.id;
    console.log(createdUserId);
    console.log(response.body);
  });

     // Test para el login
     test('Test Loading', async () => {
 
        const loginresponse = await request(app)
        .post('/users/login')
        .send({ email: 'salazars9bg@gmail.com' ,password:'1235468qwsd'});
        token=loginresponse.body.token;
        expect(loginresponse.status).toBe(200);
        console.log(loginresponse.body.user);
    
      });

   // Test para obtener un usuario
    test('should get a user', async () => {
      const response = (await request(app)
      .get(`/users/${createdUserId}`)
      .set('Authorization',`Bearer ${token}`));

      expect(response.status).toBe(200);
      expect(response.body.id).toBe( createdUserId);
      expect(response.body.firstName).toBe( 'Mateo');
      expect(response.body.email).toBe( 'salazars9bg@gmail.com');
    });

   // Test para actualizar un usuario
    test('should update a user', async () => {
      const response = await request(app)
        .put(`/users/${createdUserId}`)
        .send({ firstName: 'Updated Name' })
        .set('Authorization',`Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(createdUserId);
      expect(response.body.firstName).toBe('Updated Name');
    });

//    // Test para eliminar un usuario
   test('should delete a user', async () => {
     const response =(await request(app)
     .delete(`/users/${createdUserId}`)
     .set('Authorization',`Bearer ${token}`));
     expect(response.status).toBe(204);
   });


});

// Importar los módulos y configuraciones necesarias
const sequelize = require('../utils/connection');
const Users = require('../models/Users');
const Category=require('../models/Category');
const Product = require('../models/Product');
const app = require('../app');

// Definir los datos del usuario
const user = {
  firstName: "User",
  lastName: "Test",
  email: "testuser@gmail.com",
  password: "1235678"
};

// Función principal asíncrona para ejecutar el código
const main = async () => {
  try {
    // Sincronizar los modelos con la base de datos (crear tablas si no existen)
    await sequelize.sync({ force: true });

    // Crear el usuario en la base de datos
    const createdUser = await Users.create(user);

    // Imprimir el usuario creado
    console.log("Usuario creado:", createdUser.toJSON());
  } catch (error) {
    // Manejar errores
    console.log(error);
  } finally {
    // Salir del proceso
    process.exit();
  }
};

// Ejecutar la función principal
main();

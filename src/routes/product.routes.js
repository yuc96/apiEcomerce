const { getAll, create, getOne, remove, update } = require('../controllers/product.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const productRouter = express.Router();

productRouter.route('/')
    .get(getAll)

productRouter.route('/:id')
    .get(getOne)


// Defino Rutas privadas    
productRouter.use(verifyJWT)  
productRouter.route('/')
    .post(create);

productRouter.route('/:id')
    .delete(remove)
    .put(update);

module.exports = productRouter;
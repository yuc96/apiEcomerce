const { getAll, create, getOne, remove, update } = require('../controllers/cart.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const cartRouter = express.Router();

cartRouter.use(verifyJWT)  
cartRouter.route('/')
    .get(getAll)
    .post(create);

cartRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = cartRouter;
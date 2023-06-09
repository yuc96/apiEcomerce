const { getAll, create, getOne, remove, update } = require('../controllers/category.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const categoryRouter = express.Router();

categoryRouter.route('/')
    .get(getAll)
   

   
 
// Defino Rutas privadas    
categoryRouter.use(verifyJWT)   
categoryRouter.route('/') 
    .post(create);
categoryRouter.route('/:id')
    .delete(remove)
    .put(update)
    .get(getOne);
module.exports = categoryRouter;
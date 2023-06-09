const { getAll, create, getOne, remove, update } = require('../controllers/purchase.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const purchaseRouter = express.Router();


purchaseRouter.use(verifyJWT)  
purchaseRouter.route('/')
    .get(getAll)
    .post(create);


module.exports = purchaseRouter;
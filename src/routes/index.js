const express = require('express');
const router = express.Router();
const cloudinaryRouter= require('./cloudinary.routes');
const usersRouter=require('./users.routes');
const categoryRouter= require('./category.routes');
const productRouter= require('./product.routes');
const cartRouter=require('./cart.routes');
const purchaseRouter = require('./purchase.routes');
// colocar las rutas aquí
router.use("/images",cloudinaryRouter);
router.use("/users",usersRouter);
router.use("/category",categoryRouter);
router.use("/product",productRouter);
router.use("/cart",cartRouter);
router.use("/purchase",purchaseRouter);

module.exports = router;
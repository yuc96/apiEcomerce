const { create, remove, getAll } = require('../controllers/cloudinary.controller');
const express = require('express');
const upload = require('../utils/multer');
const verifyJWT = require('../utils/verifyJWT');

const cloudinaryRouter = express.Router();

// Defino Rutas privadas    
cloudinaryRouter.use(verifyJWT)  

cloudinaryRouter.route('/')
    .get(getAll)
    .post(upload.single('image'),create)

cloudinaryRouter.route('/:id')
	.delete(remove)

module.exports = cloudinaryRouter;
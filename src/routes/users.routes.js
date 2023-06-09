const { getAll, create, getOne, remove, update, login } = require('../controllers/users.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const usersRouter = express.Router();

usersRouter.route('/')
    .post(create);

usersRouter.route('/login')
    .post(login);

 usersRouter.use(verifyJWT)
 usersRouter.route('/')
    .get(getAll) ;  
 usersRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = usersRouter;
const catchError = require('../utils/catchError');
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let UserIdLogin;


const getAll = catchError(async(req, res) => {
    const results = await Users
.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Users
.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Users
.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Users
.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const newbody = req.body;
    if(newbody.password){
        const hashedPasword = await bcrypt.hash(newbody.password,10);
        newbody.password=hashedPasword;
    }
    const result = await Users
    .update(
            newbody,
            { where: {id}, returning: true }
        );
        if(result[0] === 0) return res.sendStatus(404);
        return res.json(result[1][0]);
});

// Controller Login
const login= catchError(async(req, res) => {
        const {email,password}= req.body;
        const user = await Users.findOne({where:{email}});
        if(!user) {return res.status(401).json({message:"User not foudn"})};
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid){return res.status(401).json({message:"Pasword is Incorrect"})};
        req.user = { id: user.id }; // de esta forma puedo ver en otros controladores el userId logeado
        console.log(UserIdLogin);
         const token = jwt.sign(
             {user},
             process.env.TOKEN_SECRET,
            { expiresIn: '1d' }
         )
        return res.json({user,token, message: 'Session Started Successfully' });
})





module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login
}
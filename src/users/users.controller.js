const usersModel = require ("./users.model");
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const {validationResult} = require("express-validator");


const all= async (req, res) => {
  const pins = await usersModel.getAll();
  res.json(pins) 
};

const create = async (req, res) => {
    console.log(req.body);

    const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

    const salt = bcrypt.genSaltSync(10);
    const userCreated = await usersModel.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt),
    });

    const token = jwt.sign({id: userCreated._id}, process.env.TOKEN_SECRET); 
    //id: userCreated._id porque si pones todo el userCreated, estás poniendo en el token tooooda la info, incluida la psswd

    res.status(201).json(token);
};

const getOne = async (req, res) => {
    const userById = await usersModel.getById(req.params.id);
    if (userById){
        return res.status(200).json(userById);
    }
        return res.status(404).json("couldn't find ID");
}       

const remove = async (req, res) => {
    const deleteUserById = await usersModel.deleteById(req.params.id);
    if (deleteUserById){
        return res.status(200).json(deleteUserById + "deleted!")
    }
        return res.status(404).json("couldn't delete!")
}

const update = async (req, res) => {
    const id= req.params.id;
    const body= req.body;

    const updateById = await usersModel.updateById(id, body);
    if (updateById) {
        return res.status(200).json("updated! lereelele")
    }
        return res.status(404).json("couldn't delete!!!")
}


module.exports= {
    all,
    create,
    getOne,
    remove,
    update
};
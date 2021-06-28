const express = require('express');
const router = express.Router();
const authController = require ("./auth.controller");
const jwt = require ('jsonwebtoken');

/*  const middleware = async (req, res,next) => {
    if (!req.headers.authorization) {
        return res.status(401).json('Forbidden.');
     }
 
     const token = req.headers.authorization.split(' ')[1];
 
     jwt.verify(token, process.env.TOKEN_SECRET, function (err) {
         if (err) {
             return res.status(402).json(err)
         }
             return next();
     })
 } */

 router
 .route("/login")
    .post(authController.login)
 // "/login" la "/" porta implícit "/auth". Es un post porque necesitamos pasar un body

module.exports = router;
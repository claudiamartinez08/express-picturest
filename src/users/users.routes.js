const express = require("express");
const router = express.Router();
const usersController = require("./users.controller");
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");

const middleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json("Forbidden.");
  }
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.TOKEN_SECRET, function (err) {
    if (err) {
      return res.status(401).json(err);
    }
    return next();
  });
};

router
  .route("/")
  .get(usersController.all)
  .post(
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    usersController.create
  );

router
  .route("/:id")
  .get(usersController.getOne)
  .delete(usersController.remove)
  .put(usersController.update);

module.exports = router;

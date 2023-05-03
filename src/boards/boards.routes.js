const express = require("express");
const router = express.Router();
const boardsController = require("./boards.controller");
const jwt = require("jsonwebtoken");
const { body } = require("express-validator"); //validation

const middleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json("Forbidden.");
  }

  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.TOKEN_SECRET, function (err) {
    if (err) {
      return res.status(402).json(err);
    }
    return next();
  });
};

router.route("/").get(boardsController.all).post(boardsController.create);

router
  .route("/:id")
  .get(boardsController.getOne)
  .delete(middleware, boardsController.remove)
  .put(middleware, boardsController.update);

module.exports = router;

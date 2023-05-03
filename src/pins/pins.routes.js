const express = require("express");
const router = express.Router();
const pinsController = require("./pins.controller");
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

router.route("/").get(pinsController.all).post(pinsController.create);

router
  .route("/:id")
  .get(pinsController.getOne)
  .delete(pinsController.remove)
  .put(pinsController.update);

router.route("/search/:text").get(pinsController.search);

module.exports = router;

const boardsModel = require("./boards.model");
const { validationResult } = require("express-validator"); //validation
const jwt = require("jsonwebtoken");

const all = async (request, response) => {
  const board = await boardsModel.getAll();
  response.json(board);
};

const create = async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  /* const token = request.headers.authorization.split(" ")[1];
    const tokenDecoded = jwt.decode(token);
    console.log(tokenDecoded); */

  const board = await boardsModel.create({
    ...request.body,
    /*     userId: tokenDecoded.id,
     */
  });
  response.status(201).json(board);
};

const getOne = async (request, response) => {
  const boardById = await boardsModel.getById(request.params.id);
  if (boardById) {
    return response.status(200).json(boardById);
  } else {
    return response.status(404).json("couldn't find board!");
  }
};

const remove = async (request, response) => {
  const deleteBoardById = await boardsModel.deleteById(request.params.id);
  if (deleteBoardById) {
    return response.status(200).json("yay! board deleted");
  } else {
    return response.status(404).json("sorry! couldn't delete board");
  }
};

const update = async (request, response) => {
  const id = request.params.id;
  const body = request.body;

  const updateBoard = await boardsModel.updateById(id, body);
  if (updateBoard) {
    return response.status(200).json("yay! board updated");
  } else {
    return response.status(404).json("sorry, couldn't update board");
  }
};

module.exports = {
  all,
  create,
  getOne,
  remove,
  update,
};

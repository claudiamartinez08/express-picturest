const mongoose = require("mongoose");

const BoardsSchema = new mongoose.Schema({
  name: String,
  /*  urlImg: String,
    pins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pins'}],
    userId: mongoose.Schema.Types.ObjectId, */
});

const BoardsModel = mongoose.model("boards", BoardsSchema);

const getAll = async () => {
  const boards = await BoardsModel.find();
  return boards;
};

const create = async (board) => {
  const boardCreated = await BoardsModel.create(board);
  return boardCreated;
};

const getById = async (id) => {
  const boardById = await BoardsModel.findById(id);
  return boardById;
};

const deleteById = async (id) => {
  const deleteBoardById = await BoardsModel.findByIdAndDelete(id);
  return deleteBoardById;
};

const updateById = async (id, body) => {
  const updateBoardById = await BoardsModel.findByIdAndUpdate(id, body);
  return updateBoardById;
};
module.exports = {
  getAll,
  create,
  getById,
  deleteById,
  updateById,
};

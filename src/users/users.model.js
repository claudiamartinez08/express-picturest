const mongoose = require("mongoose");
require("../pins/pins.model");

const usersSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  username: String,
  image: String,
  boards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "boards",
    },
  ],
});

const usersModel = mongoose.model("users", usersSchema);

const getAll = async () => {
  const users = await usersModel.find().populate("boards");
  return users;
};

const search = async ({ query }) => {
  const user = await usersModel.findOne({ query });
  return user;
};

const create = async (user) => {
  const userCreated = await usersModel.create(user);
  return userCreated;
};

const getById = async (id) => {
  const userById = await usersModel.findById(id).populate("pins");
  return userById;
};

const deleteById = async (id) => {
  const deleteUserById = await usersModel.findByIdAndDelete(id);
  return deleteUserById;
};

const updateById = async (id, body) => {
  const updateUserById = await usersModel.findByIdAndUpdate(id, body);
  return updateUserById;
};
module.exports = {
  getAll,
  search,
  create,
  getById,
  deleteById,
  updateById,
};

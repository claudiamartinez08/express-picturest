const pinModel = require("./pins.model");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const all = async (req, res) => {
  const pins = await pinModel.getAll();
  res.json(pins);
};

const search = async (req, res) => {
  const text = req.params.text;
  const filteredPins = await pinModel.searchWord({
    name: { $regex: text, $options: "i", $diacriticSensitive: false },
  });
  res.json(filteredPins);
};

const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  /*   const token = req.headers.authorization.split(" ")[1];
   */
  /* const tokenDecoded = jwt.decode(token); */ //convierte el token a json.

  const pin = await pinModel.create({
    ...req.body,
  });
  res.status(201).json(pin);
};

const getOne = async (req, res) => {
  const pinById = await pinModel.getById(req.params.id);
  if (pinById) {
    return res.status(200).json(pinById);
  }
  return res.status(404).json("not found");
};

const update = async (req, res) => {
  const body = req.body;
  const id = req.params.id;

  const updatePinById = await pinModel.updateById(id, body);
  if (updatePinById) {
    return res.status(200).json("updated! lereelele");
  }
  return res.status(404).json("couldn't update!");
};
const remove = async (req, res) => {
  const id = req.params.id;

  const deletePinById = await pinModel.deleteById(id);
  if (deletePinById) {
    return res.status(200).json("deleted!");
  }
  return res.status(404).json("couldn't delete!!!");
};

module.exports = {
  all,
  create,
  search,
  getOne,
  update,
  remove,
};

const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const pins = require("./src/pins/pins.routes");
const boards = require ("./src/boards/boards.routes");
const users= require ("./src/users/users.routes");
const auth = require ("./src/auth/auth.routes");
require ("dotenv").config();


const mongoose = require("mongoose");

const options = { useNewUrlParser: true, useUnifiedTopology: true };
const mongo = mongoose.connect(
  process.env.DB_HOST,
  options
);

mongo.then(()=> {
  console.log("Mongo ready to accept queries");
});

global.appRoot = path.resolve(__dirname);

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.disable("x-powered-by");

app.use('/pins', pins);
app.use('/boards', boards);
app.use('/users', users)
app.use('/auth', auth);

const start = async () => {
  try {
    app.listen(5000, () => {
      console.log(`REST API on http://localhost:5000`);
    });
  } catch (e) {
    console.error(e);
  }
};


start();

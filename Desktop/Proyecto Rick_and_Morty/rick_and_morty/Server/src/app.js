const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes");

const server = express();

server.use(morgan("dev"));
server.use(cors());

server.use(express.json()); //permite crear la propiedad Body
server.use("/rickandmorty", router); //creando una ruta raiz

module.exports = server;

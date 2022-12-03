const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const { API_VERSION } = require("./config");

const userRoutes = require("./src/routes/user");
const parkingLotRoutes = require("./src/routes/parkingLot");
const authRoutes = require("./src/routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Evita el bloqueo del CORS */
app.use(cors());

/* Creación de los endpoint del proyecto */
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, parkingLotRoutes);
app.use(`/api/${API_VERSION}`, authRoutes);

/* Condiguración de los header HTTP */
module.exports = app;
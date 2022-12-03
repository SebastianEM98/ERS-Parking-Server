const express = require("express");
const ParkingLotController = require("../controllers/parkingLot");

const api = express.Router();

api.post("/createParkingLot", ParkingLotController.createParkingLot);
api.get("/parkingLots", ParkingLotController.getParkingLots);
api.get("/activeParkingLots", ParkingLotController.getActiveParkingLots);
api.patch("/updateParkingLot/:id", ParkingLotController.updateParkingLot);
api.put("/activateParkingLot/:id", ParkingLotController.activateParkingLot);
api.delete("/deleteParkingLot/:id", ParkingLotController.deleteParkingLot);

module.exports = api;
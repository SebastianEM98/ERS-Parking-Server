const bcrypt = require("bcrypt-nodejs");
const ParkingLot = require("../models/parkingLot");
const jwt = require("../utils/jwt");
const fs = require("fs");
const path = require("path");

const createParkingLot = (req, res) => {
    const parkingLot = new ParkingLot();
    const { parkingLot_name,  capacity, active} = req.body;
    parkingLot.parkingLot_name = parkingLot_name;
    parkingLot.capacity = capacity;
    parkingLot.active = active;
    /* Si no existe una de las dos password */
    if (!parkingLot_name || !capacity || !active) {
        res.status(404).send({ message: "Todos los campos son obligatorios" });
    } else {
        parkingLot.save((err, parkingLotStored) => {
            if (err) {
            res.status(500).send({ message: "El parqueadero ya existe." });
            } else {
            if (!parkingLotStored) {
                res.status(404).send({ message: "Error al crear parqueadero." });
            } else {
                res.status(200).send({ parkingLot: parkingLotStored });
            }
            }
        });
    }
};

async function getParkingLots(req, res) {
  const { active } = req.query;
  let response = null;

  if (active === undefined) {
    response = await ParkingLot.find();
  } else {
    response = await ParkingLot.find({ active });
  }
  res.status(200).send(response);
}

const getActiveParkingLots = (req, res) => {
    const activeParkingLots = req.query;
    ParkingLot.find({ active: activeParkingLots.active }).then((parkingLots) => {
        !parkingLots
        ? res.status(404).send({ message: "No se ha encontrado ningún parqueadero activo" })
        : res.status(200).send({ parkingLots });
    });
};

const activateParkingLot = (req, res) => {
    const { id } = req.params;
    const { active } = req.body;

    ParkingLot.findByIdAndUpdate(id, { active }, (err, parkingLotStored) => {
        err
        ? res.status(500).send({ message: "Error del servidor." })
        : !parkingLotStored
        ? res.status(404).send({ message: "No se ha encontrado el parqueadero." })
        : active === true
        ? res.status(200).send({ message: "Parqueadero activado correctamente." })
        : res.status(200).send({ message: "Parqueadero desactivado correctamente." });
    });
};

async function getParkingLot(req, res) {
    const { parkingLot_id } = req.parkingLot;
    const response = await ParkingLot.findById(parkingLot_id);
    if (!response) {
        res.status(400).send({ msg: "No se ha encontrado el parqueadero" });
    } else {
        res.status(200).send(response);
    }
}

async function updateParkingLot(req, res) {
  const { id } = req.params;
  const parkingLotData = req.body;

  ParkingLot.findByIdAndUpdate({ _id: id }, parkingLotData, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al actualizar el parqueadero" });
    } else {
      res.status(200).send({ msg: "Actualizacion correcta" });
    }
  });
}

async function deleteParkingLot(req, res) {
  const { id } = req.params;

  ParkingLot.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al eliminar el parqueadero" });
    } else {
      res.status(200).send({ msg: "Parqueadero eliminado" });
    }
  });
}

module.exports = {
    createParkingLot,
    getParkingLots,
    getActiveParkingLots,
    updateParkingLot,
    activateParkingLot,
    deleteParkingLot,
    getParkingLot
};
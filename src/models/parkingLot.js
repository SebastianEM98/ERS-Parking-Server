const mongoose = require("mongoose");
const ParkingLotSchema = mongoose.Schema({
    parkingLot_name: {
        type: String,
        require: true,
    },
    capacity: {
        type: Number,
        unique: true,
    },
    active: {
        type: Boolean,
        require: true,
    },
});

module.exports = mongoose.model("ParkingLot", ParkingLotSchema);
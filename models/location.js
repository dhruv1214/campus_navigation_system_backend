const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    buildingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    floor: Number,
    roomNumber: String,
    location: {
        coordinates: {
            type: [Number],
            index: '2dsphere'
        }
    }
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;

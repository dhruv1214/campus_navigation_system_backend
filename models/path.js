const mongoose = require("mongoose");

const pathSchema = new mongoose.Schema({
    startLocation: {
        locationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Location'
        },
        coordinates: [Number]
    },
    endLocation: {
        locationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Location'
        },
        coordinates: [Number]
    },
    pathType: {
        type: String,
        required: true,
        trim: true
    },
    length: Number,
    description: String
});

const Path = mongoose.model('Path', pathSchema);
module.exports = Path;

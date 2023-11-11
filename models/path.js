const mongoose = require("mongoose");

const pathSchema = new mongoose.Schema({
    startLocation: {
        locationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Location'
        },
    },
    endLocation: {
        locationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Location'
        },
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

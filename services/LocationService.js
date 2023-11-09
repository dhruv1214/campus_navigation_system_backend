const Location = require('../models/location');

const LocationService = {
    async listLocations() {
        try {
            return await Location.find();
        } catch (error) {
            throw error;
        }
    },

    async getLocationById(locationId) {
        try {
            return await Location.findById(locationId);
        } catch (error) {
            throw error;
        }
    },

    async createLocation(locationData) {
        try {
            const location = new Location(locationData);
            return await location.save();
        } catch (error) {
            throw error;
        }
    },

    async updateLocation(locationId, locationData) {
        try {
            return await Location.findByIdAndUpdate(locationId, locationData, { new: true });
        } catch (error) {
            throw error;
        }
    },

    async deleteLocation(locationId) {
        try {
            return await Location.findByIdAndDelete(locationId);
        } catch (error) {
            throw error;
        }
    }
};

module.exports = LocationService;

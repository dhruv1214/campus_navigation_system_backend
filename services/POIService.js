const PointOfInterest = require('../models/pointsOfIntrest');

const POIService = {
    async listPOIs() {
        try {
            return await PointOfInterest.find();
        } catch (error) {
            throw error;
        }
    },

    async getPOIById(poiId) {
        try {
            return await PointOfInterest.findById(poiId);
        } catch (error) {
            throw error;
        }
    },

    async createPOI(poiData) {
        try {
            const poi = new PointOfInterest(poiData);
            return await poi.save();
        } catch (error) {
            throw error;
        }
    },

    async updatePOI(poiId, poiData) {
        try {
            return await PointOfInterest.findByIdAndUpdate(poiId, poiData, { new: true });
        } catch (error) {
            throw error;
        }
    },

    async deletePOI(poiId) {
        try {
            return await PointOfInterest.findByIdAndDelete(poiId);
        } catch (error) {
            throw error;
        }
    }
};

module.exports = POIService;

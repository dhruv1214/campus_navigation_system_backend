const Building = require('../models/building');

const BuildingService = {
    async listBuildings() {
        try {
            return await Building.find();
        } catch (error) {
            // handle error
            throw error;
        }
    },

    async getBuildingById(buildingId) {
        try {
            return await Building.findById(buildingId);
        } catch (error) {
            // handle error
            throw error;
        }
    },

    async createBuilding(buildingData) {
        try {
            const building = new Building(buildingData);
            return await building.save();
        } catch (error) {
            // handle error
            throw error;
        }
    },

    async updateBuilding(buildingId, buildingData) {
        try {
            return await Building.findByIdAndUpdate(buildingId, buildingData, { new: true });
        } catch (error) {
            // handle error
            throw error;
        }
    },

    async deleteBuilding(buildingId) {
        try {
            return await Building.findByIdAndRemove(buildingId);
        } catch (error) {
            // handle error
            throw error;
        }
    }
};

module.exports = BuildingService;

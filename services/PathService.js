const Path = require('../models/path');

const PathService = {
    async listPaths() {
        try {
            return await Path.find();
        } catch (error) {
            throw error;
        }
    },

    async getPathById(pathId) {
        try {
            return await Path.findById(pathId);
        } catch (error) {
            throw error;
        }
    },

    async createPath(pathData) {
        try {
            const path = new Path(pathData);
            return await path.save();
        } catch (error) {
            throw error;
        }
    },

    async updatePath(pathId, pathData) {
        try {
            return await Path.findByIdAndUpdate(pathId, pathData, { new: true });
        } catch (error) {
            throw error;
        }
    },

    async deletePath(pathId) {
        try {
            return await Path.findByIdAndDelete(pathId);
        } catch (error) {
            throw error;
        }
    }
};

module.exports = PathService;

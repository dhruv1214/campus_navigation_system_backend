const driver = require('../db');

const BuildingService = {
    async listBuildings() {
        const session = driver.session();

        try {
            const result = await session.run(
                'MATCH (b:Building) RETURN b'
              );
              return result.records;
        } catch (error) {
            // handle error
            throw error;
        } finally {
            await session.close();
        }
    },

    async getBuildingById(buildingId) {
        const session = driver.session();

        try {
            const result = await session.run(
                'MATCH (b:Building) WHERE id(b) = $buildingId RETURN b',
                {
                    buildingId: buildingId
                }
              );
              return result.records;
        } catch (error) {
            // handle error
            throw error;
        } finally {
            await session.close();
        }
    },

    async createBuilding(buildingData) {
        const session = driver.session();

        try {
            const result = await session.run(
                'CREATE (b:Building {buildingId: randomUUID(), name: $name, description: $description, imageURL: $imageURL}) RETURN b',
                {
                    name: buildingData.name,
                    description: buildingData.description,
                    imageURL: buildingData.imageURL
                }
              );
              return result.records;
        } catch (error) {
            throw error;
        } finally {
            await session.close();
        }
    },

    async updateBuilding(buildingId, buildingData) {
        const session = driver.session();

        try {
            const result = await session.run(
                'MATCH (b:Building) WHERE id(b) = $buildingId SET b.name = $name, b.description = $description, b.imageURL = $imageURL RETURN b',
                {
                    buildingId: buildingId,
                    name: buildingData.name,
                    description: buildingData.description,
                    imageURL: buildingData.imageURL
                }
              );
              return result.records;
        } catch (error) {
            // handle error
            throw error;
        } finally {
            await session.close();
        }
    },

    async deleteBuilding(buildingId) {
        const session = driver.session();

        try {
            const result = await session.run(
                'MATCH (b:Building) WHERE id(b) = $buildingId DETACH DELETE b',
                {
                    buildingId: buildingId
                }
              );
              return result.records;
        } catch (error) {
            // handle error
            throw error;
        } finally {
            await session.close();
        }
    }
};

module.exports = BuildingService;

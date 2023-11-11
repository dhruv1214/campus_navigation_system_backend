const driver = require("../db");

const LocationService = {
	async listLocations() {
		const session = driver.session();

		try {
			const result = await session.run("MATCH (l:Location) RETURN l");
			return result.records;
		} catch (error) {
			throw error;
		} finally {
			await session.close();
		}
	},

	async getLocationById(locationId) {
		const session = driver.session();

		try {
			const result = await session.run(
				"MATCH (l:Location) WHERE id(l) = $locationId RETURN l",
				{
					locationId: locationId,
				}
			);
			return result.records;
		} catch (error) {
			throw error;
		} finally {
			await session.close();
		}
	},

	async createLocation(locationData) {
		const session = driver.session();

		try {

			if(!locationData.buildingId){
				throw new Error('BuildingId is required');
			}

			const result = await session.run(
				"CREATE (l:Location {locationId: randomUUID(), buildingId: $buildingId, name: $name, description: $description, floor: $floor, roomNumber: $roomNumber}) RETURN l",
				{
					buildingId: locationData.buildingId,
					name: locationData.name,
					description: locationData.description,
					floor: locationData.floor,
					roomNumber: locationData.roomNumber,
				}
			);

			const locationNode = result.records[0].get("l");

			await session.run(
				"MATCH (l:Location {locationId: $locationId}), (b:Building {buildingId: $buildingId}) CREATE (l)-[:LOCATED_AT]->(b)",
				{
					locationId: locationNode.properties.locationId,
					buildingId: locationData.buildingId,
				}
			);

			if (
				locationData.connectedLocations &&
				locationData.connectedLocations.length > 0
			) {
				for (const connectedLocationId of locationData.connectedLocations) {
					await session.run(
						"MATCH (l:Location {locationId: $locationId}), (l2:Location {locationId: $connectedLocationId}) CREATE (l)-[:CONNECTED_TO]->(l2)",
						{
							locationId: locationData.locationId,
							connectedLocationId: connectedLocationId,
						}
					);
				}
			}

			return locationNode;
		} catch (error) {
			throw error;
		} finally {
			await session.close();
		}
	},

	async updateLocation(locationId, locationData) {
        const session = driver.session();

        try {
            const result = await session.run(
                "MATCH (l:Location) WHERE id(l) = $locationId SET l.name = $name, l.description = $description, l.floor = $floor, l.roomNumber = $roomNumber RETURN l",
                {
                    locationId: locationId,
                    name: locationData.name,
                    description: locationData.description,
                    floor: locationData.floor,
                    roomNumber: locationData.roomNumber,
                }
            );

            const locationNode = result.records[0].get("l");

			await session.run(
				"MATCH (l:Location {locationId: $locationId})-[r:LOCATED_AT]->() DELETE r",
				{
					locationId: locationId,
				}
			);

			await session.run(
				"MATCH (l:Location {locationId: $locationId}), (b:Building {buildingId: $buildingId}) CREATE (l)-[:LOCATED_AT]->(b)",
				{
					locationId: locationId,
					buildingId: locationData.buildingId,
				}
			);

            if (
                locationData.connectedLocations &&
                locationData.connectedLocations.length > 0
            ) {
                await session.run(
                    "MATCH (l:Location {locationId: $locationId})-[r:CONNECTED_TO]->() DELETE r",
                    {
                        locationId: locationId,
                    }
                );

                for (const connectedLocationId of locationData.connectedLocations) {
                    await session.run(
                        "MATCH (l:Location {locationId: $locationId}), (l2:Location {locationId: $connectedLocationId}) CREATE (l)-[:CONNECTED_TO]->(l2)",
                        {
                            locationId: locationId,
                            connectedLocationId: connectedLocationId,
                        }
                    );
                }
            }

            return locationNode;
        } catch (error) {
            throw error;
        } finally {
            await session.close();
        }
	},

	async deleteLocation(locationId) {
        const session = driver.session();

        try {
            const result = await session.run(
                "MATCH (l:Location) WHERE id(l) = $locationId DETACH DELETE l",
                {
                    locationId: locationId,
                }
            );
            return result.records;
        } catch (error) {
            throw error;
        } finally {
            await session.close();
        }
	},
};

module.exports = LocationService;

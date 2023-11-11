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
			const result = await session.run(
				"CREATE (l:Location {locationId: $locationId, buildingId: $buildingId, name: $name, description: $description, floor: $floor, roomNumber: $roomNumber}) RETURN l",
				{
					locationId: locationData.locationId,
					buildingId: locationData.buildingId,
					name: locationData.name,
					description: locationData.description,
					floor: locationData.floor,
					roomNumber: locationData.roomNumber,
				}
			);

			const locationNode = locationResult.records[0].get("l");

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

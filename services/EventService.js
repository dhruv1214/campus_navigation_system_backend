const driver = require('../db');


const EventService = {
    async listEvents() {
        const session = driver.session();

        try {
            const result = await session.run("MATCH (e:Event) RETURN e");
            return result.records;
        } catch (error) {
            throw error;
        } finally {
            await session.close();
        }

    },

    async getEventById(eventId) {
        const session = driver.session();

        try {
            const result = await session.run(
                "MATCH (e:Event) WHERE id(e) = $eventId RETURN e",
                {
                    eventId: eventId,
                }
            );
            return result.records;
        } catch (error) {
            throw error;
        } finally {
            await session.close();
        }
    },

    async createEvent(eventData) {
        const session = driver.session();

        try {
           
            if(!eventData.locationId){
                throw new Error('LocationId is required');
            }

            const result = await session.run(
                "CREATE (e:Event {eventId: randomUUID(), name: $name, description: $description, startDateTime: $startDateTime, endDateTime: $endDateTime}) RETURN e",
                {
                    name: eventData.name,
                    description: eventData.description,
                    startDateTime: eventData.startDateTime,
                    endDateTime: eventData.endDateTime
                }
            );

            const eventNode = result.records[0].get("e");

            await session.run(
                "MATCH (e:Event {eventId: $eventId}), (l:Location {locationId: $locationId}) CREATE (e)-[:LOCATED_AT]->(l)",
                {
                    eventId: eventNode.properties.eventId,
                    locationId: eventData.locationId
                }
            );

            return eventNode.properties;

        } catch (error) {
            throw error;
        } finally {
            await session.close();
        }
    },

    async updateEvent(eventId, eventData) {
        const session = driver.session();

        try {
            const result = await session.run(
                "MATCH (e:Event) WHERE id(e) = $eventId SET e.name = $name, e.description = $description, e.startDateTime = $startDateTime, e.endDateTime = $endDateTime RETURN e",
                {
                    eventId: eventId,
                    name: eventData.name,
                    description: eventData.description,
                    startDateTime: eventData.startDateTime,
                    endDateTime: eventData.endDateTime
                }
            );

            const eventNode = result.records[0].get("e");

            // Delete existing relationship
            await session.run(
                "MATCH (e:Event {eventId: $eventId})-[r:LOCATED_AT]->() DELETE r",
                {
                    eventId: eventNode.properties.eventId
                }
            );

            await session.run(
                "MATCH (e:Event {eventId: $eventId}), (l:Location {locationId: $locationId}) CREATE (e)-[:LOCATED_AT]->(l)",
                {
                    eventId: eventNode.properties.eventId,
                    locationId: eventData.locationId
                }
            );

            return eventNode.properties;
        } catch (error) {
            throw error;
        } finally {
            await session.close();
        }
    },

    async deleteEvent(eventId) {
        const session = driver.session();

        try {
            const result = await session.run(
                "MATCH (e:Event) WHERE id(e) = $eventId DETACH DELETE e",
                {
                    eventId: eventId,
                }
            );

            return result.records[0].get("e").properties;
        } catch (error) {
            throw error;
        } finally {
            await session.close();
        }
    }
};

module.exports = EventService;

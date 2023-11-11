const Event = require('../models/event');
const driver = require('../db');


const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    startDateTime: {
        type: Date,
        required: true
    },
    endDateTime: {
        type: Date,
        required: true
    },
    location: {
        locationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Location'
        },
        coordinates: [Number]
    }
});

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
        try {
            return await Event.findByIdAndUpdate(eventId, eventData, { new: true });
        } catch (error) {
            throw error;
        }
    },

    async deleteEvent(eventId) {
        try {
            return await Event.findByIdAndDelete(eventId);
        } catch (error) {
            throw error;
        }
    }
};

module.exports = EventService;

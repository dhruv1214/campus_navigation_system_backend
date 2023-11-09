const Event = require('../models/event');

const EventService = {
    async listEvents() {
        try {
            return await Event.find();
        } catch (error) {
            throw error;
        }
    },

    async getEventById(eventId) {
        try {
            return await Event.findById(eventId);
        } catch (error) {
            throw error;
        }
    },

    async createEvent(eventData) {
        try {
            const event = new Event(eventData);
            return await event.save();
        } catch (error) {
            throw error;
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

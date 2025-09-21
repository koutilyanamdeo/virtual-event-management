const eventModel = require("../models/eventsModel");

const updateEvent = (req, res) => {
    const { id } = req.params;
    
    const { organiser, title, description, date, time } = req.body;
    const { userId } = req.user;

    const event = eventModel.find(event => event.id === parseInt(id) && event.createdBy === userId);
    if (!event) {
        return res.status(404).json({ message: 'Event not found or you do not have permission to update this event' });
    }

    if (organiser) event.organiser = organiser;
    if (title) {
        if (typeof title !== 'string' || title.length < 5) {
            return res.status(400).json({ message: 'Title must be a string with at least 5 characters' });
        }
        event.title = title;
    }
    if (description) {
        if (typeof description !== 'string' || description.length < 10) {
            return res.status(400).json({ message: 'Description must be a string with at least 10 characters' });
        }
        event.description = description;
    }
    if (date) event.date = date; // Additional validation for date can be added
    if (time) event.time = time; // Additional validation for time can be added

    res.status(200).json({ message: 'Event updated successfully', event });
    // Here you would typically update the event in a database
};

module.exports = updateEvent;
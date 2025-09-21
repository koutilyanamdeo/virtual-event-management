const eventModel = require('../models/eventsModel');

const deleteEvent = (req, res) => {
    const { eventId } = req.params;
    const { id } = req.user;
    
    const eventIndex = eventModel.findIndex(event => event.id === parseInt(eventId) && event.createdBy === id);
    if (eventIndex === -1) {
        return res.status(404).json({ message: 'Event not found or you do not have permission to delete this event' });
    }
    
    eventModel.splice(eventIndex, 1);
    res.status(200).json({ message: 'Event deleted successfully' });
    // Here you would typically remove the event from a database
};

module.exports = deleteEvent;
const eventModel = require('../models/eventsModel');

const createEvent = (req, res) => {
    const { organiser ,title , description, date, time } = req.body;
    const {userId,role} = req.user;
if(role !== 'organiser'){
    return res.status(403).json({ message: 'Only organisers can create events' });
}
    if (!organiser || !title || !description || !date || !time) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (typeof title !== 'string' || title.length < 5) {
        return res.status(400).json({ message: 'Title must be a string with at least 5 characters' });
    }
    if (typeof description !== 'string' || description.length < 10) {
        return res.status(400).json({ message: 'Description must be a string with at least 10 characters' });
    }
    // Additional validation for date and time can be added here

    const newEvent = {
        id: eventModel.length + 1,
        organiser,
        title,
        description,
        date,
        time,
        participants: [],
        createdBy: userId
    };
    
    eventModel.push(newEvent);
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
    // Here you would typically save the event to a database

};

module.exports = createEvent;
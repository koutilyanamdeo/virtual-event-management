const eventModel = require("../models/eventsModel");

const fetchEvents = (req, res) => {
    res.status(200).json(eventModel);
};

module.exports = fetchEvents;
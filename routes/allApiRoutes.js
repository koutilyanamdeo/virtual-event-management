const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/register');
const {loginUser} = require('../controllers/login');
const createEvent = require('../controllers/createEvent');
const getAllEvents = require('../controllers/fetchEvent');
const updateEvent = require('../controllers/updateEvent');
const deleteEvent = require('../controllers/deleteEvent');
const registerForEvent = require('../controllers/participantManagement');

const JWTAuthorisation = require('../middleware/JWTAuthorisation');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/event', JWTAuthorisation, createEvent);

router.get('/event', JWTAuthorisation, getAllEvents);

router.put('/event/:id', JWTAuthorisation, updateEvent);

router.delete('/event/:id', JWTAuthorisation, deleteEvent);

router.post('/event/:id/register', JWTAuthorisation, registerForEvent);

module.exports = router;
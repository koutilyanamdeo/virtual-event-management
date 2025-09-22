const registrationModel = require("../models/registrationModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_ROUNDS = require('dotenv').config();
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const secretKey = process.env.JWT_SECRET || 'VIRTUAL_EVENT_MANAGEMENT';

function validateEmail(email) {
  const regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    const existingUser = registrationModel.find(user => user.email === email);
   
    if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
    }

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    
    if (typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({ message: 'Password must be a string with at least 6 characters' });
    }

    if (typeof email !== 'string' || email.length < 5) {
        return res.status(400).json({ message: 'Email must be a string with at least 5 characters' });
    }

    if (!['organiser', 'attendee'].includes(role)) {
        return res.status(400).json({ message: 'Role must be either organiser or attendee' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds); // In a real application, ensure to hash the password before storing
    const newUser = { userId: registrationModel.length + 1, name, email, password:hashedPassword, role };
    registrationModel.push(newUser);

    const token = jwt.sign(newUser, secretKey, {
            expiresIn: '1h' // The token will be valid for 1 hour
        });
    res.status(200).send({token, message: 'User registered successfully' });
};

module.exports = { registerUser };
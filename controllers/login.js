const registration = require('../models/registrationModel');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'VIRTUAL_EVENT_MANAGEMENT';
const expiresIn = '1h';

function validateEmail(email) {
  const regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }else if(!validateEmail(email)) {
        return res.status(400).send('Invalid email format');
    } else if (typeof password !== 'string' || password.length < 6) {
        return res.status(400).send('Password must be a string with at least 6 characters');
    } else if (typeof email !== 'string' || email.length < 5) {
        return res.status(400).send('Email must be a string with at least 5 characters');
    }
    const user = registration.find(u => u.email === email);
    if (!user) {
        return res.status(401).send('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(401).send('Invalid email or password');
    }else {
        const token = jwt.sign(user, secretKey, { expiresIn });
        return res.status(200).send({ message: 'Login successful', token });
    }
    
}

module.exports = { loginUser };
    // Generate JWT token
const jwt = require('jsonwebtoken');
const registration = require('../models/registrationModel');
const secretKey = process.env.JWT_SECRET || 'VIRTUAL_EVENT_MANAGEMENT';
const JWTAuthorisation = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
   
    if (!token) {
        return res.status(400).json({ message: 'Access token missing' });
    }

    // console.log(token);
    const decodedToken = jwt.verify(token, secretKey);
    
    if(!decodedToken){
        return res.status(401).json({ message: 'Invalid token' });
    }

    console.log(decodedToken);

    req.user = decodedToken;
    next();
}
module.exports = JWTAuthorisation;
const eventModel = require("../models/eventsModel");
const nodeMailer = require("nodemailer");


const sendEmail = (to, subject, name) => {
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'koutilya.namdeo888@gmail.com',
            pass: 'Gauruv@1209'
        }
    });

    const mailOptions = {
        from: 'koutilya.namdeo888@gmail.com',
        to:to,
        subject: subject,
        html: `<h1>${subject}</h1><p>You have successfully registered for the event.</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};
const participantManagement = (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;
    
    const event = eventModel.find(event => event.id === parseInt(id));
    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }

    if (!event.participants) {
        event.participants = [];
    }

    if (event.participants.includes(userId)) {
        return res.status(400).json({ message: 'User already registered for this event' });
    }

    event.participants.push(userId);
    sendEmail(req.user.email, `Registration Successful for ${event.title}`, req.user.name);
    res.status(200).json({ message: 'User registered for the event successfully' });
    // Here you would typically update the event in a database
}
module.exports = participantManagement;

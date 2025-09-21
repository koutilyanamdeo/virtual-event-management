const express = require('express');
const allApiRoutes = require('./routes/allApiRoutes');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1', allApiRoutes);
// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to the Virtual Event Management System!');
});

app.listen(PORT, (error) => {
    if (error) {
        return console.log('Error starting server:', error);
    }
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
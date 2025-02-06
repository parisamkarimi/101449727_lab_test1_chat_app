require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => console.error(' MongoDB Connection Error:', err));

// Add a simple route for testing
app.get('/', (req, res) => {
    res.send(' Server is running successfully!');
});

app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});

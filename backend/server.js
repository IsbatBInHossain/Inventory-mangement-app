const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5500;

// Middleware for parsing JSON
app.use(express.json());

// Middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Welcome to Warehouse Wizzzzzzzzzard!!!');
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Start the server
    app.listen(PORT, () => {
      console.log(
        `Server is running on port ${PORT}. Navigate to http://localhost:${PORT}/`
      );
    });
  })
  .catch(err => console.log(err));

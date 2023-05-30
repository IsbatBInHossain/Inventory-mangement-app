const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5500;
const userRoute = require('./routes/userRoute');
const errorhandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Route middlewares
app.use('/api/users', userRoute);

app.get('/', (req, res) => {
  res.send('Welcome to Warehouse Wizzzzzzzzzard!!!');
});

// Error Handler
app.use(errorhandler);

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

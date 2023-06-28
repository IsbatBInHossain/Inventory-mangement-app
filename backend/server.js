require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5500;
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const contactRoute = require('./routes/contactRoutes');
const errorhandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, 'https://warehouse-wizard.vercel.app'],
    credentials: true,
  })
);
app.use('/uploads', express.static(path.join('__dirname', 'uploads')));

// Route middlewares
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/contact', contactRoute);

app.get('/', (req, res) => {
  res.send('Welcome to Warehouse Wizard!!!');
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

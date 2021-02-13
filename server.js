const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

// Connect Database
try {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
} catch (error) {
  console.log(error.message);

  process.exit(1);
}

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('error', (error) => console.log(error));

// Init Middleware
app.use(express.json({ extended: false }));

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/category', require('./routes/api/category'));
app.use('/api/product', require('./routes/api/product'));
app.use('/api/order', require('./routes/api/order'));
app.use('/api/mail', require('./routes/api/mail'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  console.log(process.env.NODE_ENV);
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

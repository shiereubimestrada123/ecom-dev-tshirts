const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

// Connect Database
try {
  mongoose.connect(process.env.mongoURI, {
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
app.use('/api/braintree', require('./routes/api/braintree'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

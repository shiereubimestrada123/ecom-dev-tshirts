const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

// Connect Database
mongoose.connect(process.env.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('error', (error) => console.log(error));

// Init Middleware
app.use(express.json({ extended: false }));

// Routes
app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

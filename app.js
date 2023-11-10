if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const session = require('express-session');

const methodOverride = require('method-override');
const mongoSanitize = require('express-mongo-sanitize');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const secret = process.env.SECRET || 'thisshouldbeabettersecret';

app.use(express.json());
// app.use(session(sessionConfig));

// Mount Routes
app.use('/products', productRoutes);

app.get('/', (req, res) => {
  res.render('home');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});

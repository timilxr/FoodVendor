const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');
const passport = require("passport");

require('dotenv').config();

const uri = process.env.URI;
const port = process.env.PORT || 2000;
const app = express();

mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once('open', ()=>console.log('Database connected successfully'));

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const ordersRouter = require('./routes/orders');
const usersRouter = require('./routes/users');
const mealsRouter = require('./routes/meals');
const preordersRouter = require('./routes/preoders');

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

app.use('/meals', mealsRouter);
app.use('/orders', ordersRouter);
app.use('/users', usersRouter);
app.use('/preoders', preordersRouter);

app.listen(port, ()=>{
    console.log(`Your server is up and running on port: ${port}`);
});
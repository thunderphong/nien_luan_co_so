// Set .env
require("dotenv").config();

// Set express	
const express = require('express');
const app = express();
const passport = require('passport');
const cookieParser = require('cookie-parser');

app.listen(process.env.PORT || 3000, () => 
    console.log("Server's up and listening on port "+ process.env.PORT || 3000));

// Set view template
app.set('view engine', 'pug');
app.set('views', './views');

// Set req.body
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
const bodyParser = require('body-parser');
app.use(cookieParser());
app.use(passport.initialize());
require("./config/passport");

// Set mongoose and database
const mongoose = require('mongoose');
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    (err) => {
        if(err) console.log(err);
        else console.log('Connected to db')
    }
)

// Route rootpage
app.get('/', (req, res) => {
	res.render('firstPage');
})

// Mocked route
app.get('/abc', (req, res) => {
    res.send('You are done!');
})

// Set login route
const loginRoute = require('./routes/login.route');
app.use('/login', loginRoute);

// Set logout route
const logoutRoute = require('./routes/logout.route');
app.use('/logout', logoutRoute);

// Set register route
const registerRoute = require('./routes/register.route');
app.use('/register', registerRoute);

// Set User Route
const userRoute = require('./routes/user.route');
app.use('/user', userRoute);

// Static file
app.use(express.static('public'));
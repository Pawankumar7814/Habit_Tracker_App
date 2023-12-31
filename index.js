const express = require("express");
const app = express();
const path = require("path");
const db = require("./config/mongoose");
const conf = require("./config/config.json");
const session = require("express-session");
const passport = require("passport");
const passport_local = require("./config/passport_local");
require('dotenv').config();
const mongoStore = require("connect-mongo");

// LOCAL PORT
const port = 8000;

// PARSE FORM DATA
app.use(express.urlencoded());

// SETTINGS FOR ASSETS FILES
app.use(express.static(path.join(__dirname, "assets")));

// TO SETUP EXPRESS-SESSION
app.use(
    session({
        name: "codial",
        secret: 'jdsjdsa',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 10,
        },
        store: mongoStore.create({
                mongoUrl: conf.databaseURI,
                mongooseConnection: db,
                autoRemove: "disabled",
            },
            function(err) {
                console.log(err || "mongostore is connected");
            }
        ),
    })
);

// SETTING FOR PASSPORT.JS
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// SETUP VIEWS SETTING
app.set("view engine", "ejs");
app.set("views", "views");

// ROUTERS
app.use('/', require('./routers'));

// TO LISTEN OUR APP TO LOCAL PORT
app.listen(port, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("app is listening on port:", port);
    return;
});
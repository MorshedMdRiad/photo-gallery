//jshint esversion:10
const express = require('express'); // initializing the express module
const router = express.Router(); // setting up the router
const home = require('../controller/homePage'); // linking up the home controller
const artists = require('../controller/artists'); // linking up the artist controller
const gallery = require('../controller/gallery'); // linking up the gallery controller
const contact = require('../controller/contact'); // linking up the contact controller
const register = require("../controller/register"); // linking up the register controller
const login = require('../controller/login'); // linking up the login controller
const dashboard = require('../controller/dashboard'); // linking up the dashboard controller

///multer for uploading photo 
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file);

        cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
        let name = file.originalname.split(".");
        cb(null, Date.now() + "." + name[1]);
    },
});

var upload = multer({
    storage: storage,
});

///multer upload done ///


// initializing the authentication middleware
const {
    forwardAuthenticated,
    ensureAuthenticated
} = require('../config/auth'); 

//setting up the static files like images,js,css,icon-fonts files
router.use(express.static('public'));
router.use(express.urlencoded({
    extended: true
})); //parsing data from body


// settingup the route for the home page home
router
    .route('/')
    .get(home.homePage);


// setting up the route for the gallery page
router
    .route('/gallery')
    .get(gallery.gallery);

//setting up the route for the artists page
router
    .route('/artists')
    .get(artists.artists);

//setting up the route for the contact page
router
    .route('/contact')
    .get(contact.contact);


// setting up the route for registration page
router
    .route('/registration')
    .get(forwardAuthenticated, register.registration)
    .post(forwardAuthenticated,register.registrationPost);

// setting up the route for login page
router
    .route('/login')
    .get(forwardAuthenticated, login.login)
    .post(login.loginPost);

// setting up the route for dashboard page
router
    .route('/dashboard')
    .get(ensureAuthenticated, dashboard.dashboard);

module.exports = router;
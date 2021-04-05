const express = require('express');
const router = express.Router();

// Controllers
const userController = require('../Controllers/userController');
const spotController = require('../Controllers/spotController');

// Make a POST request to 
router.post('/signup', userController.bcrypt, userController.addUser, (req, res) => {
    // res.locals.users is the data in the query:
    res.status(200).send(res.locals.users);
});

router.post('/login', userController.login, (req, res) => {
    res.status(200).send(res.locals.users);
})




module.exports = router;
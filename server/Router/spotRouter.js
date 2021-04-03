const express = require('express');
const router = express.Router();

// Controllers
const userController = require('../Controllers/userController');
const spotController = require('../Controllers/spotController');


// View all parking spaces
router.get('/viewAllSpots', spotController.viewAllSpots, (req, res) => {
  res.status(200).json(res.locals.allSpots)
})

// View available parking spaces


// View unavailable parking spaces


// Create new parking space
router.post('/newSpot', spotController.createNewSpot, (req, res) => {
  res.status(200).json(res.locals.newSpot)
})


// Delete parking space
router.delete('/deleteSpot', spotController.deleteSpot, (req, res) => {
  res.status(200).json('Delete Successful')
})



module.exports = router;
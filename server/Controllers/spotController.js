const db = require('../Models/ParkingSpotModels');


const spotController = {};


// View all parking spaces
spotController.viewAllSpots = (req, res, next) => {

  // Set default status and expired_time to "open" and date.now. 
  const queryStr = 'SELECT * FROM "public"."ParkingSpace"';
  db.query(queryStr)
  .then(data => {
    res.locals.allSpots = data.rows
    next();
  })
  .catch(err => next({err}))

}

// View available parking spaces


// View unavailable parking spaces


// Create new parking spot
spotController.createNewSpot = (req, res, next) => {

  // Store description in constants from req.body
  const {locationId} = req.body

  // Set default status and expired_time to "open" and date.now. 
  const queryStr = `INSERT INTO "public"."ParkingSpace" (status, locationid, expired_time) VALUES ('open', ${locationId}, ${Date.now().toString()})`;
  db.query(queryStr)
  .then(data => {
    console.log(data)
    res.locals.newSpot = data.rows
    next();
  })
  .catch(err => next({err}))

}


// Delete parking space
spotController.deleteSpot = (req, res, next) => {

  // Store id of parking spot to be deleted
  const {locationid} = req.body;

  // Delete parking lot associated with id
  const queryStr = `DELETE FROM "public"."ParkingSpace" WHERE locationid = ${locationid}`;

  db.query(queryStr)
  .then(data => {
    console.log(data)
    // res.locals.newSpot = data.rows[0]
    next();
  })
  .catch(err => next({err}))

}








module.exports = spotController;
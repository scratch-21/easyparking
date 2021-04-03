const db = require('../Models/ParkingSpotModels');


const spotController = {};


// View all parking spaces
spotController.viewAllSpots = (req, res, next) => {

  // Set default status and expired_time to "open" and date.now. 
  const queryStr = 'SELECT * FROM "public"."ParkingSpace"';
  db.query(queryStr)
  .then(data => {
    res.locals.allSpots = data.rows[0]
    next();
  })
  .catch(err => next({err}))

}


// View available parking spaces


// View unavailable parking spaces

// Create new parking spot
spotController.createNewSpot = (req, res, next) => {

  // Store description in constants from req.body
  const {description} = req.body

  // Set default status and expired_time to "open" and date.now. 
  const queryStr = `INSERT INTO "public"."ParkingSpace" (status, description, expired_time) VALUES ('open', ${description}, ${Date.now})`;
  db.query(queryStr)
  .then(data => {
    res.locals.newSpot = data.rows[0]
    next();
  })
  .catch(err => next({err}))

}


// Delete parking space
spotController.deleteSpot = (req, res, next) => {

  // Store id of parking spot to be deleted
  const {id} = req.body;

  // Delete parking lot associated with id
  const queryStr = `DELETE FROM "public"."ParkingSpace" WHERE id = ${id}`;

  db.query(queryStr)
  .then(data => {
    console.log(data)
    // res.locals.newSpot = data.rows[0]
    next();
  })
  .catch(err => next({err}))

}








module.exports = spotController;
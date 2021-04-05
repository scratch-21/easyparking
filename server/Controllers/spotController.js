const db = require('../Models/ParkingSpotModels');


const spotController = {};


// View all parking spaces
spotController.viewAllSpots = (req, res, next) => {

  // Find all parking spots
  const queryStr = 'SELECT * FROM "public"."ParkingSpace"';
  db.query(queryStr)
  .then(data => {
    res.locals.allSpots = data.rows
    next();
  })
  .catch(err => next({err}))

}

// View available parking spaces
spotController.viewAvailableSpots = (req, res, next) => {
  const currentTime = new Date();

  let coercedDate = currentTime.toISOString().split('T')[0]+' '+currentTime.toTimeString().split(' ')[0]
  // Find only available parkign spots
  const queryStr = `SELECT * FROM "public"."ParkingSpace" where id_user IS NULL AND expired_time < '${coercedDate}'`;
  db.query(queryStr)
  .then(data => {
    res.locals.availableSpots = data.rows
    next();
  })
  .catch(err => next({err}))
}


// View unavailable parking spaces
spotController.viewUnavailableSpots = (req, res, next) => {
  const currentTime = new Date();

  let coercedDate = currentTime.toISOString().split('T')[0]+' '+currentTime.toTimeString().split(' ')[0]
  // Find only available parkign spots
  const queryStr = `SELECT * FROM "public"."ParkingSpace" where id_user IS NOT NULL OR expired_time > '${coercedDate}'`;
  db.query(queryStr)
  .then(data => {
    res.locals.unavailableSpots = data.rows
    next();
  })
  .catch(err => next({err}))
}


// Create new parking spot
spotController.createNewSpot = (req, res, next) => {

  // Store description in constants from req.body
  const {locationId} = req.body

  // Coerced Date to work with SQL Timestamp type 
  const d = new Date(); 
  let coercedDate = d.toISOString().split('T')[0]+' '+d.toTimeString().split(' ')[0]
  
  // Set default status and expired_time to "open" and date.now. 
  const queryStr = `INSERT INTO "public"."ParkingSpace" (status, locationid, expired_time) VALUES ('open', ${locationId}, '${coercedDate}')`;
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
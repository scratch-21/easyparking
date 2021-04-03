const db = require('../Models/ParkingSpotModels');

const userController = {};

// Create a userController as middleware to pass it userRouter:
userController.addUser = (req, res, next) => {
    // safety feature: VALUES ($1, $2, $3, $4, $5) 
    // sanitizes i.e. saves from hackers...
    
    const query = `INSERT INTO "public"."Users" (first_name, last_name, email, password, id_role)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    // Deconstruct column names from req.body:
    const {
        first_name,
        last_name,
        email,
        password,
        id_role
    } = req.body;

    const values = [
        first_name,
        last_name,
        email,
        password,
        id_role
    ];

    db.query(query, values)
        .then(data => { 
            // console.log(data); 
            res.locals.users = data.rows;
            return next();
        })
        .catch( err => next({
            log: 'error',
            status: 500,
            // error: 
            message: { error: err }
        }));
}






module.exports = userController;
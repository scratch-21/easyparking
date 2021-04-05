const db = require('../Models/ParkingSpotModels');
const bcrypt = require ('bcrypt');
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
        id_role
    } = req.body;

    const values = [
        first_name,
        last_name,
        email,
        res.locals.bcrypt, // this is the resulting hash after passing our password through bcrypt
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
            message: { err }
        }));
}

// bcrypt middleware:
userController.bcrypt = (req, res, next) => {
    // deconstruct password from the req.body
    const { password } = req.body;
    const saltRounds = 5;

    bcrypt.hash(password, saltRounds, function(err, hash) {
        // Store hash in database here
        if (err) {
            console.error(err);
            return;
          }
          console.log(hash);
        res.locals.bcrypt = hash;
        next();
    });
}

// login middleware: purpose is to check if the inputted password matches the password used when the user signed up
userController.login = (req, res, next) => {
    const { email, password } = req.body;
    // Retrieve the hash (original password) of the user's stored password from the database:
    const hash = `SELECT password FROM "public"."users" WHERE email = "${email}";`;
    const inputtedPassword = password;
    bcrypt.compare(inputtedPassword, hash, (err, result) => {
        if (result) {
            console.log('Login Successful!');
            `SELECT email, first_name FROM "public"."users";`
        } else {
                // console.log('Invalid Password!');
                return res.json('Email & password combination not found!');
            } 
    })
}






module.exports = userController;
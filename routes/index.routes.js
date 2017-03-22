const express = require('express');
const router = express.Router();



// Set up variables that hold our routes
const userRoutes = require('./user.route');
const usersRoutes = require('./users.route');


const storeRoutes = require('./stores.route');



// mount all routes to /api
router.use('/user', userRoutes);
router.use('/users', usersRoutes);





module.exports = router;
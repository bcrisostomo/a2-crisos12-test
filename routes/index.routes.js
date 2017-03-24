const express = require('express');
const router = express.Router();



// Set up variables that hold our routes
const homeRoutes = require('./home.route');

const userRoutes = require('./user.route');
const usersRoutes = require('./users.route');


const storesRoutes = require('./stores.route');
const storeRoutes = require('./store.route');

const reviewRoutes = require('./review.route');

const reviewsRoutes = require('./reviews.route');


// mount all routes
router.use('/', homeRoutes);


router.use('/user', userRoutes);
router.use('/users', usersRoutes);

router.use('/stores', storesRoutes);
router.use('/store', storeRoutes);

router.use('/review', reviewRoutes);
router.use('/reviews', reviewsRoutes);





module.exports = router;
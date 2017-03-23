const express = require('express');
const router = express.Router();
const reviewCtrl = require('../controllers/reviews.controller');



router.get('/', function(req, res, next){
    reviewCtrl.getReviews(req, res);
});



module.exports = router;

const express = require('express');
const router = express.Router();
const reviewCtrl = require('../controllers/review.controller');


router.get('/', function(req, res, next){
    res.render('pages/review');
});

router.get('/', function(req, res, next){
    reviewCtrl.getReview(req, res);
});

router.post('/', function(req, res, next){
    reviewCtrl.addReview(req, res);
});

router.delete('/', function(req, res, next){
    reviewCtrl.deleteReview(req, res);
});

router.put('/', function(req, res, next){
    reviewCtrl.updateReview(req, res);
});


module.exports = router;

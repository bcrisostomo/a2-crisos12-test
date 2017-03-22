const express = require('express');
const router = express.Router();
const storesCtrl = require('../controllers/stores.controller');



router.get('/', function(req, res, next){
    storesCtrl.getStores(req, res);
});


module.exports = router;




const express = require('express');
const router = express.Router();
const storeCtrl = require('../controllers/store.controller');


router.get('/', function(req, res, next){
    res.render('pages/store');
});

router.get('/', function(req, res, next){
    storeCtrl.getStore(req, res);
});

router.post('/', function(req, res, next){
    storeCtrl.addStore(req, res);
});

router.delete('/', function(req, res, next){
    storeCtrl.deleteStore(req, res);
});

router.put('/', function(req, res, next){
    storeCtrl.updateStore(req, res);
});


module.exports = router;




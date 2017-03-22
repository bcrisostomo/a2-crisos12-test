var mongoose = require('mongoose');

var Schema = mongoose.Schema;


/*
    Schema for storess for Database
*/
var StoreSchema = new Schema(
    {
        __id: {
            type: String
        },
        storename: {
            type: String, required:true
        },
        category: {
            type: String, default: ""
        },
        address: {
            type: String, default: ""
        
        },
    },
    {

        collection: 'stores'
    }

);

// mongoose.connect('mongodb://localhost/stores');

// Doc for Mongoose Models: http://mongoosejs.com/docs/models
module.exports = mongoose.model('stores', StoreSchema);




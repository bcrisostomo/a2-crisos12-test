
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


/*
    Schema for reviews for Database
*/
var ReviewsSchema = new Schema(
    {
        _id: {
            type: String
        },
        userID: {
            type: String, required: true
        },
        storeID: {
            type: String, required: true
        },
        rating: {
            type: Number, required: true
        },
        
        comment: {
            type: String
        },
    
    },
    {
        collection: 'reviews'
    }
);

// mongoose.connect('mongodb://localhost/reviews');

// Doc for Mongoose Models: http://mongoosejs.com/docs/models
module.exports = mongoose.model('reviews', ReviewsSchema);


/*
{
    "reviews": [
        {
            "_id":"231",
            "userID": "894",
            "storeID":"631",
            "rating": 4,
            "comment": "No one respects the 'Quiet Study Space' on the second floor :("
        },
        {   "_id":"152",
            "userID": "1256",
            "storeID":"631",
            "rating": 8,
            "comment": "Building is beautiful, the people inside unfortunately smell..."
        },
        {   "_id":"315",
            "userID": "5313",
            "storeID":"631",
            "rating": 8,
            "comment": "If only they have some windows and macs around!"
        },
        {   "_id":"426",
            "userID": "1256",
            "storeID":"631",
            "rating": 10,
            "comment": "Love the supply of soylents and ice cream sandwiches on hand!"
        }
    ]
}
}*/

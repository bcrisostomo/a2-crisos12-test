
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


/*
    Schema for user for Database
*/
var UserSchema = new Schema(
    {
        _id: {
            type: String
        },
        firstname: {
            type: String, default: ""
        },
        lastname: {
            type: String, default: ""
        },
        username: {
            type: String, required: true, unique: true
        },
        sex: {
            type: String, enum: ['M', 'F'], default:""
        },
        age: {
            type: Number, default: 0
        },
    },
    {
        collection: 'users'
    }
);

// mongoose.connect('mongodb://localhost/users');

// Doc for Mongoose Models: http://mongoosejs.com/docs/models
module.exports = mongoose.model('users', UserSchema);

/*
"users": [
        {   
            "_id": "4723",
            "username": "gump1994",
            "firstname":"Tom",
            "lastname":"Hanks",
            "sex": "M",
            "age": 60
        },
        {
            "_id": "572",
            "username": "h0rcrux",
            "firstname":"Tom",
            "lastname":"Riddle",
            "sex": "M",
            "age": 71
        },
        {
            "_id": "192",
            "username": "m1ssionP0zzible",
            "firstname":"Tom",
            "lastname":"Cruise",
            "sex": "M",
            "age": 54
        }
    ]
}*/
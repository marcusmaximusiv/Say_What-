// Headline model
// ==============

// Require mongoose
var mongoose = require("mongoose");

// Create a schema class using mongoose's schema method
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    first_name: {
        type: String,
        required:true
    },
    last_name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    username: {
        type: String, 
        required: true,
        unique: { index: { unique: true } }
    },
    password: {
        type: String, 
        required: true,
        unique: true
    }
})

var User=mongoose.model("User",UserSchema);

module.exports= User;
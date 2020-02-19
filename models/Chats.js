// Chats model
// ==========

// Require mongoose
var mongoose = require("mongoose");
// Create the schema class using mongoose's schema method
var Schema = mongoose.Schema;

// Create the chatsSchema with the schema object
var chatsSchema = new Schema({
username: {
    type: Schema.Types.ObjectId,
    ref: "User"
},
chat_text: String,
date: {
    type: Date,
    default: Date.now
}
})

// Create the Headline model using the headlineSchema
var Chats = mongoose.model("Chats", chatsSchema);

// Export the Headline model
module.exports = Chats;
*creates the user database

use user 

*ensure the user db is running

db

*insert dummy data for the databases to be created. User manages all the user information and chat manages all the chat info 

db.user.insert({"fname": "test", "lname":"test", "email":"test@test.com", "username": "test", "password": "test", "})
db.chat.insert({"username":"","chat_entry":"", "date":"timestamp"})

*adding the data and making it pretty

db.user.find().pretty()
db.chat.find().pretty()

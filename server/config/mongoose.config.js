const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/moneyTrackerDB2", {
   useNewUrlParser: true,
   useUnifiedTopology: true 
})
    .then(() => console.log("Connected to the DB"))
    .catch(error => console.log("Something happened when trying to connect to the DB "+error));
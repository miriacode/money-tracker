const express = require("express");
const cors = require("cors");
const app = express();

//To use JSOn and get URL data
app.use( express.json(), express.urlencoded({ extended: true }));

//To allow access from a different port
app.use (
    cors( {
        origin: "http://localhost:3000"
    })
)

//To initialice BD
require("./server/config/mongoose.config");

//To import routes
const myRoutes = require("./server/routes/transaction.routes");
myRoutes(app);
const myCategoriesRoutes = require("./server/routes/category.routes");
myCategoriesRoutes(app);

//To execute server
app.listen(8000, () => console.log("Server is ready!"));
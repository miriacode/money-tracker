const express = require("express");
const cors = require("cors");
const app = express();
// (Session) To use Cookies
const cookieParser = require("cookie-parser");

//To use JSOn and get URL data
app.use( express.json(), express.urlencoded({ extended: true }));

// (Session) To use Cookies
app.use(cookieParser());

//To allow access from a different port
app.use (
    cors( {
        origin: "http://localhost:3000",
        //(Session) Credentials
        credentials:true
    })
)

//To initialice BD
require("./server/config/mongoose.config");

//To import routes
const myTransactionRoutes = require("./server/routes/transaction.routes");
myTransactionRoutes(app);
const myCategoriesRoutes = require("./server/routes/category.routes");
myCategoriesRoutes(app);
const myUserRoutes = require("./server/routes/user.routes");
myUserRoutes(app);

//To execute server
app.listen(8000, () => console.log("Server is ready!"));
const UserController = require("../controllers/user.controller");

// const {authenticate} = require("../config/jwt.config");

module.exports = app => {
    app.post("/api/register", UserController.register);

    // app.post("/api/login", UserController.login);

    // app.get("/api/logout", UserController.logout);
}
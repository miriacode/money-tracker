const UserController = require("../controllers/user.controller");

const {authenticate} = require("../config/jwt.config");
const {upload} = require("../utils/multerUtility")

module.exports = app => {
    app.post("/api/register", UserController.register);

    app.post("/api/login", UserController.login);

    app.get("/api/logout", UserController.logout);

    app.get("/api/users/:id", authenticate, UserController.getUser)

    app.put("/api/users/:id", authenticate, upload.single('profilePicture'), UserController.updateUser)
}
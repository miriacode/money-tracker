const CategoryController = require("../controllers/category.controller");

const {authenticate} = require("../config/jwt.config");

module.exports = app => {
    
    app.post("/api/categories",  authenticate, CategoryController.createCategory);

    app.get("/api/categories",  authenticate, CategoryController.getAll);

    //MOD
    //app.get("/api/categories/type/:type",  authenticate, CategoryController.get_all_by_type);

    app.get("/api/categories/:id", authenticate, CategoryController.getCategory);
    

    app.put("/api/categories/:id", authenticate,  CategoryController.updateCategory);

    app.delete("/api/categories/:id",  authenticate, CategoryController.deleteCategory);

    //GET ALL CATEGORIES FROM 1 USER
    app.get("/api/categories/find/:userId", authenticate, CategoryController.getAllByUser)
}
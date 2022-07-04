const CategoryController = require("../controllers/category.controller");

const {authenticate} = require("../config/jwt.config");

module.exports = app => {
    
    app.post("/api/categories",  authenticate, CategoryController.createCategory);

    //MOD
    app.get("/api/categories/:categoryName",  authenticate, CategoryController.getCategoryColor);

    app.get("/api/categories/id/:id", authenticate, CategoryController.getCategory);
    
    app.put("/api/categories/:id", authenticate,  CategoryController.updateCategory);

    app.delete("/api/categories/:id",  authenticate, CategoryController.deleteCategory);

    app.get("/api/categories/find/:userId", authenticate, CategoryController.getAllByUser)
}
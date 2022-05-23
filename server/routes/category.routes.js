const CategoryController = require("../controllers/category.controller");

const {authenticate} = require("../config/jwt.config");

module.exports = app => {
    
   
    app.post("/api/categories",  authenticate, CategoryController.create_category);

    app.get("/api/categories",  authenticate, CategoryController.get_all);

    //MOD
    app.get("/api/categories/type/:type",  authenticate, CategoryController.get_all_by_type);

    app.get("/api/categories/:id", authenticate, CategoryController.get_category);
    

    app.put("/api/categories/:id", authenticate,  CategoryController.update_category);

    app.delete("/api/categories/:id",  authenticate, CategoryController.delete_category);
}
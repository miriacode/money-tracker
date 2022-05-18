const CategoryController = require("../controllers/category.controller");

module.exports = app => {
    
   
    app.post("/api/categories", CategoryController.create_category);

    app.get("/api/categories", CategoryController.get_all);

    //MOD
    app.get("/api/categories/type/:type", CategoryController.get_all_by_type);

    app.get("/api/categories/:id", CategoryController.get_category);
    

    app.put("/api/categories/:id", CategoryController.update_category);

    app.delete("/api/categories/:id", CategoryController.delete_category);
}
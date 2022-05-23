const TransactionController = require("../controllers/transaction.controller");

const {authenticate} = require("../config/jwt.config");

module.exports = app => {
    app.post("/api/transactions", authenticate, TransactionController.create_transaction);

    app.get("/api/transactions", authenticate, TransactionController.get_all);

    app.get("/api/transactions/:id", authenticate, TransactionController.get_transaction);

    app.put("/api/transactions/:id", authenticate, TransactionController.update_transaction);

    app.delete("/api/transactions/:id", authenticate, TransactionController.delete_transaction);
}
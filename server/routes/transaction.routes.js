const TransactionController = require("../controllers/transaction.controller");

module.exports = app => {
    app.post("/api/transactions", TransactionController.create_transaction);

    app.get("/api/transactions", TransactionController.get_all);

    app.get("/api/transactions/:id", TransactionController.get_transaction);

    app.put("/api/transactions/:id", TransactionController.update_transaction);

    app.delete("/api/transactions/:id", TransactionController.delete_transaction);
}
const TransactionController = require("../controllers/transaction.controller");

const {authenticate} = require("../config/jwt.config");

module.exports = app => {
    app.post("/api/transactions", authenticate, TransactionController.createTransaction);

    app.get("/api/transactions/find/:userId", authenticate, TransactionController.getAllByUser);

    app.get("/api/transactions/:id", authenticate, TransactionController.getTransaction);

    app.put("/api/transactions/:id", authenticate, TransactionController.updateTransaction);

    app.delete("/api/transactions/:id", authenticate, TransactionController.deleteTransaction);
}
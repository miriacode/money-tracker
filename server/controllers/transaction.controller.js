const Transaction = require("../models/transaction.model");
// import sortTransactionsByPeriodForChart from "../service/transaction.service"
const TransactionService = require("../service/transaction.service")

module.exports.getAllByUser = (req, res) => {
    Transaction.find({userId: req.params.userId})
        .then(transactions => res.json(transactions))
        .catch(error => res.status(400).json(error));
}

module.exports.getAmountByUserByPeriod = (req, res) => {
    Transaction.find(req.body,{_id: 0, userId: 0, type:0, title:0, description:0, category:0, date:0, createdAt:0, updatedAt:0 })
        .then(transactions => res.json(transactions))
        .catch(error => res.status(400).json(error)); //[{amount:200}]
}

module.exports.getAmountByUserByPeriodForChart = (req, res) => {
    Transaction.find(req.body,{_id: 0, userId: 0, type:0, title:0, description:0, category:0, createdAt:0, updatedAt:0 })
        .then(transactions =>res.json(transactions))
        .catch(error => res.status(400).json(error)); //[{amount:200, date:"2022-01-01"}]
}

module.exports.getForChart = (req, res) => {
    // Transaction.find(req.body,{_id: 0, userId: 0, type:0, title:0, description:0, category:0, createdAt:0, updatedAt:0 })
    // sortTransactionsByPeriodForChart(req)
    TransactionService.sortTransactionsByPeriodForChart(req.body)
    //.then(() => res.json({}))
    .then(transactions => res.json(transactions))
    .catch(error => res.status(400).json(error)); //[{amount:200, date:"2022-01-01"}]
}

// module.exports.sortTransactionsByPeriodForChart(req,res) => {

// }
// module.exports.getByUserByLast5Transactions = (req, res) => {
//     Transaction.find(req.body,{_id: 0, userId: 0, type:1, title:1, description:0, category:0, date:0, createdAt:0, updatedAt:0 }).sort({$date:-1}).limit(5)
//         .then(transactions => res.json(transactions))
//         .catch(error => res.status(400).json(error));
// }

module.exports.getLast6ByUser = (req, res) => {
    Transaction.find({userId: req.params.userId}).sort({date: -1}).limit(6)
        .then(transactions => res.json(transactions))
        .catch(error => res.status(400).json(error));
}

module.exports.createTransaction = (req, res) => {
    Transaction.create(req.body)
        .then(transaction => res.json(transaction))
        .catch(error => res.status(400).json(error));
}

module.exports.getTransaction = (req, res) => {
    Transaction.findOne({_id: req.params.id})
        .then(transaction => res.json(transaction))
        .catch(error => res.status(400).json(error));
}

module.exports.updateTransaction = (req, res) => {
    Transaction.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .then(transaction => res.json(transaction))
        .catch(error => res.status(400).json(error));
}

module.exports.deleteTransaction = (req, res) => {
    Transaction.deleteOne({_id: req.params.id})
        .then(result => res.json(result))
        .catch(error => res.status(400).json(error));
}
const Transaction = require("../models/transaction.model");

module.exports.get_all = (req, res) => {
    Transaction.find()
    /*To order, 1 means ascending order */
    // Transaction.find().collation({locale: "en"}).sort({title: 1})
        .then(transactions => res.json(transactions))
        .catch(error => res.status(400).json(error));
}

module.exports.create_transaction = (req, res) => {
    Transaction.create(req.body)
        .then(transaction => res.json(transaction))
        .catch(error => res.status(400).json(error));
}

module.exports.get_transaction = (req, res) => {
    Transaction.findOne({_id: req.params.id})
        .then(transaction => res.json(transaction))
        .catch(error => res.status(400).json(error));
}

module.exports.update_transaction = (req, res) => {
    Transaction.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .then(transaction => res.json(transaction))
        .catch(error => res.status(400).json(error));
}

module.exports.delete_transaction = (req, res) => {
    Transaction.deleteOne({_id: req.params.id})
        .then(result => res.json(result))
        .catch(error => res.status(400).json(error));
}
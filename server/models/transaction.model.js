const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    type: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        required: [true, "Transaction Title is required."],
    },
    description: {
        type: String,
    },
    amount: {
        type: Number,
        min: [0, 'Amount cannot be negative'],
        required: [true, "Amount is required."],
    },
    category: {
        type: String,
        required: [true, "Category is required."],
    },
}, {timestamps: true, versionKey: false})

const Transaction = mongoose.model("transactions", TransactionSchema);
module.exports = Transaction;
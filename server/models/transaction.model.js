const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    type: {
        type: String,
        default: 'expense',
        enum: {
            values: ['expense','income'],
            // message: "Please, choose a Crew Position",
        },
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
    date: {
        type: Date,
        required: [true, "Transaction Date is required."],
    },
}, {timestamps: true, versionKey: false})

const Transaction = mongoose.model("transactions", TransactionSchema);
module.exports = Transaction;
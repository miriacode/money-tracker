const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    type: {
        type: String,
        default: 'expense',
        enum: {
            values: ['expense','income'],
        },
    },
    categoryName: {
        type: String,
        required: [true, "Category Name is required."],
    }
}, {timestamps: true, versionKey: false})

const Category = mongoose.model("categories", CategorySchema);
module.exports = Category;
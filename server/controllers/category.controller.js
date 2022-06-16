const Category = require("../models/category.model");

module.exports.getCategoryColor = (req, res) => {
    Category.find({categoryName:req.params.categoryName})
    /*To order, 1 means ascending order */
    // Category.find().collation({locale: "en"}).sort({title: 1})
        .then(categories => res.json(categories))
        .catch(error => res.status(400).json(error));
}

module.exports.createCategory = (req, res) => {
    Category.create(req.body)
        .then(category => res.json(category))
        .catch(error => res.status(400).json(error));
}

module.exports.getCategory = (req, res) => {
    Category.findOne({_id: req.params.id})
        .then(category => res.json(category))
        .catch(error => res.status(400).json(error));
}

module.exports.updateCategory = (req, res) => {
    Category.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .then(category => res.json(category))
        .catch(error => res.status(400).json(error));
}

module.exports.deleteCategory = (req, res) => {
    Category.deleteOne({_id: req.params.id})
        .then(result => res.json(result))
        .catch(error => res.status(400).json(error));
}

//MOD
// module.exports.get_all_by_type = (req, res) => {
//     Category.find({type: req.params.type})
//         .then(category => {
//             res.json(category)
//             console.log( res.json(category));
//         })
//         .catch(error => res.status(400).json(error));     
// }

//GET ALL CATEGORIES FROM 1 USER
module.exports.getAllByUser = (req, res) => {
    Category.find({userId: req.params.userId})
        .then(category => res.json(category))
        .catch(error => res.status(400).json(error));
}

//GET ALL
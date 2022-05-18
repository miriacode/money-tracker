const Category = require("../models/category.model");

module.exports.get_all = (req, res) => {
    Category.find()
    /*To order, 1 means ascending order */
    // Category.find().collation({locale: "en"}).sort({title: 1})
        .then(categories => res.json(categories))
        .catch(error => res.status(400).json(error));
}

module.exports.create_category = (req, res) => {
    Category.create(req.body)
        .then(category => res.json(category))
        .catch(error => res.status(400).json(error));
}

module.exports.get_category = (req, res) => {
    Category.findOne({_id: req.params.id})
        .then(category => res.json(category))
        .catch(error => res.status(400).json(error));
}

//MOD
module.exports.get_all_by_type = (req, res) => {
    Category.find({type: req.params.type})
        .then(category => {
            res.json(category)
            console.log( res.json(category));
        })
        .catch(error => res.status(400).json(error));     
}

//MOD
// module.exports.get_all_expenses_categories = (req, res) => {
//     Category.find({type: "expense"})
//         .then(category => res.json(category))
//         .catch(error => res.status(400).json(error));     
// }



module.exports.update_category = (req, res) => {
    Category.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .then(category => res.json(category))
        .catch(error => res.status(400).json(error));
}

module.exports.delete_category = (req, res) => {
    Category.deleteOne({_id: req.params.id})
        .then(result => res.json(result))
        .catch(error => res.status(400).json(error));
}
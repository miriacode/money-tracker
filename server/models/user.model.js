const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema( {
    firstName: {
        type: String,
        required: [true, "First Name is required."]
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required."]
    },
    email: {
        type: String,
        required: [true, "E-mail is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please, use a valid e-mail"
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must have at least 8 characters long."]
    },
    cellphone:{
        type: String,
    },
    location:{
        type: String,
    },
    postalCode:{
        type: String,
    }
}, {timestamps: true, versionKey: false})

//Apply this when we don't want to storage it in the DB
UserSchema.virtual('confirmPassword')
    .get( ()=> this._confirmPassword )
    .set( value => this._confirmPassword = value )

//Before creating a user: Validate
UserSchema.pre('validate', function(next){
    if(this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords do not match.');
    }
    next();
})

//Before creating a user: Bcrypting password
UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

const User = mongoose.model("users", UserSchema);
module.exports = User;
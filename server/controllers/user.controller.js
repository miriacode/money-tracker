const User = require("../models/user.model");
//(Session) To save session (It'll be put inside a cookie)
const jwt = require("jsonwebtoken");
//(Session) The cookie needs a secret key
const secret_key = "This is my secret key";
const bcrypt = require("bcrypt");



module.exports.register = (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(usuario => {
            /*res.json(usuario);*/

            //(Session)
            const payload = {
                _id: user._id
            }

            //(Session)
            //To save the user in a cookie
            const myJWT = jwt.sign(payload, secret_key);

            res
                //(Session)
                //To get the cookie
                .cookie("usertoken", myJWT, secret_key, {
                    httpOnly: true
                })
                .json(usuario)
        })
        .catch( err => {
            console.log(err);
            res.status(400).json(err);
        })
}

module.exports.login = (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user === null){
                res.json({error: true, message: "Email is incorrect."});
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(passwordValid => {
                        if(passwordValid) {
                            const payload = {
                                _id: user._id
                            }

                            const myJWT = jwt.sign(payload, secret_key);

                            res
                                .cookie("usertoken", myJWT, secret_key, {
                                    httpOnly: true
                                })
                                .json({ error:false, message:"Sign In was successful." })


                        } else {
                            res.json({error: true, message:"Password is incorrect."})
                        }
                    })
                    .catch(err => res.json({error: true, message: "Sign In was invalid."}))
            }
        })
        .catch( err => res.json(err));
}

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.status(200).json({message: "LogOut successful!"});
}

module.exports.getUser = (req, res) => {
    User.findOne({_id: req.params.id})
        .then(user => res.json(user))
        .catch(error => res.status(400).json(error));
}

module.exports.updateUser = (req, res) => {  
    console.log(req.file)
    if(req.file){
        console.log("--------------")
        
        let allPath = req.file.path
        let splitPath = allPath.split("\\")
        let namePath = `${splitPath[4]}`
        
        var obj = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            cellphone: req.body.cellphone,
            location: req.body.location,
            postalCode: req.body.postalCode,
            profilePictureURL: namePath,
        }
    }else{
       var obj = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            cellphone: req.body.cellphone,
            location: req.body.location,
            postalCode: req.body.postalCode,
        } 
    }
    console.log(obj)
    
    User.findByIdAndUpdate({_id: req.params.id},obj, (err, item) => {
        if (err) {
            console.log(err);
        }else {
            res.status(201).json({
            message: "Profile image updated sucessfully"
            })
        }
     });
}
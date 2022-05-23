const Usuario = require("../models/user.model");
//(Session) To save session (It'll be put inside a cookie)
const jwt = require("jsonwebtoken");
//(Session) The cookie needs a secret key
const secret_key = "This is my secret key";
const bcrypt = require("bcrypt");

module.exports.register = (req, res) => {
    const user = new Usuario(req.body);
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
    Usuario.findOne({email: req.body.email})
        .then(user => {
            if(user === null){
                res.json({error: true, message: "El correo electrónico es incorrecto."});
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
                                .json({ error:false, message:"Inicio de sesión correcto" })


                        } else {
                            res.json({error: true, message:"La contraseña es incorrecta."})
                        }
                    })
                    .catch(err => res.json({error: true, message: "Inicio de sesión inválido."}))
            }
        })
        .catch( err => res.json(err));
}

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.status(200).json({message: "Salimos de sesión!"});
}
const { UserModel } = require("../models/user.model");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const register = async (req, res) => {
    let { email, password } = req.body;
    try {
        let exists = await UserModel.findOne({ email });
        if (exists) return res.status(401).send("User already exists");
        let saltRounds = 5;
        let hashedPassword = await bcrypt.hash(password, saltRounds);
        if (!hashedPassword) return res.status(500).send({ "message": err.message });
        req.body.password = hashedPassword;
        let user = new UserModel(req.body);
        await user.save();
        res.status(201).send({ "message": "User registered successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": error.message });
    }
}

const login = async (req, res) => {
    let { email, password } = req.body;
    try {
        let user = await UserModel.findOne({ email });
        if (!user) return res.statu(401).send("User not exists, please register first");
        let result = await bcrypt.compare(password, user.password);
        if (result) {
            jwt.sign({ userId: user._id }, process.env.SECERT_KEY, function (err, token) {
                if (token) {
                    res.status(201).send({ "message": "login success", data: { user, token } });
                } else {
                    console.log(err);
                    res.status(500).send({ "message": "something went wrong" });
                }
            });
        }
        else res.status(401).send({ "message": "Incorrect password" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": error.message });
    }
}

const getSingleUser = async (req, res) => {
    let _id = req.params.id;
    try {
        let user = await UserModel.findOne({ _id });
        if (user) res.status(201).send({ user });
        else res.status(500).send({ "message": "something went wrong" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": error.message });
    }

}

module.exports = {
    login,
    register,
    getSingleUser
}
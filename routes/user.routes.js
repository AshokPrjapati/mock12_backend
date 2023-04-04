const express = require("express");
const { register, login, getSingleUser } = require("../controllers/auth.controller");
const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.get("/getprofile/:id", getSingleUser);


module.exports = userRoute;
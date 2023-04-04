const express = require("express");
const { calculation } = require("../controllers/calculate.controller");
const calculateRoute = express.Router();


calculateRoute.post("/calculate", calculation);

module.exports = calculateRoute;
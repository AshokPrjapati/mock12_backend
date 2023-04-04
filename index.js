const express = require("express");
const app = express();
const connection = require("./config/db");
const userRoute = require("./routes/user.routes");
const calculateRoute = require("./routes/calculate.routes");
require("dotenv").config();
var cors = require('cors')

let port = process.env.PORT;

app.use(express.json());
app.use(cors())

app.get("/", async (res, req) => {
    res.send("welcome");
})

app.use("/user", userRoute);
app.use("/", calculateRoute);

app.listen(port, async () => {
    try {
        await connection;
        console.log("coonected to MongoDB");
    } catch (error) {
        console.log("connection failed", error.message)
    }
    console.log(`server is running at port : ${port}`);
})



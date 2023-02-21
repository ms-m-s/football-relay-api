require("dotenv").config();
const express = require("express");
var cors = require("cors");
const app = express();
const football = require("./football/script.js");

var whitelist = ["https://ms-m-s.github.io", "http://ms-m-s.github.io"];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
};

app.use(cors(corsOptions));

app.use("/", football);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});
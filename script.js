require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
var cors = require("cors");
const app = express();
const football = require("./football/script.js");

var whitelist = ["https://ms-m-s.github.io", "http://ms-m-s.github.io" /*, "http://127.0.0.1:5500", "null"*/ ];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 /* || !origin*/ ) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
};

const min = 2;
const limiter = rateLimit({
    windowMs: min * 60 * 1000,
    max: 10,
    handler: (req, res) => {
        return res.status(429).json({
            error: "You've reached your requests limit. Please comeback in " + min + " minutes!",
            min: min,
            errorToDisplay: "You've reached your requests limit. Please comeback in "
        });
    }
});

app.use(cors(corsOptions));

app.use(limiter);

app.use("/", football);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});
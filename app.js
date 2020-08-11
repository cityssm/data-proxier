"use strict";
const express = require("express");
const compression = require("compression");
const configFns = require("./helpers/configFns");
const routerData = require("./routes/dataRouter");
const app = express();
app.use(compression());
app.use(express.urlencoded({
    extended: false
}));
const localIPs = ["127.0.0.1", "1"];
const ipChecker = (req, res, next) => {
    console.log(req.ip);
    const ipAddress = req.ip.split(":").pop();
    if (localIPs.includes(ipAddress) ||
        configFns.getProperty("whitelistIPs").includes(ipAddress)) {
        return next();
    }
    return res.json({
        success: false,
        message: "IP address not allowed: " + ipAddress
    });
};
app.use("/", ipChecker, routerData);
module.exports = app;

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
const ipChecker = (req, res, next) => {
    const ipAddress = req.ip.split(":").pop();
    if (configFns.getProperty("whitelistIPs").includes(ipAddress)) {
        return next();
    }
    return res.json({
        success: false,
        message: "IP address not allowed: " + ipAddress
    });
};
app.use("/", ipChecker, routerData);
module.exports = app;

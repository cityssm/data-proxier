"use strict";
const express = require("express");
const compression = require("compression");
const routerData = require("./routes/dataRouter");
const app = express();
app.use(compression());
app.use(express.urlencoded({
    extended: false
}));
app.use("/", routerData);
module.exports = app;

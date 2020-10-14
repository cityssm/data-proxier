"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.windowsServiceConfig = void 0;
const path = require("path");
exports.windowsServiceConfig = {
    name: "Data Proxier",
    description: "Limit the amount of data exposed using a database proxy. ",
    script: path.join(__dirname, "bin", "www.js")
};

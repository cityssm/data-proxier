"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProperty = void 0;
const log = require("fancy-log");
let config = "";
try {
    config = require("../data/config");
}
catch (_e) {
    log.warn("Using data/config-sample.js");
    config = require("../data/config-sample");
}
const configFallbackValues = new Map();
configFallbackValues.set("application.httpPort", 6474);
configFallbackValues.set("whitelistIPs", []);
function getProperty(propertyName) {
    const propertyNameSplit = propertyName.split(".");
    let currentObj = config;
    for (const propertyNamePiece of propertyNameSplit) {
        if (currentObj.hasOwnProperty(propertyNamePiece)) {
            currentObj = currentObj[propertyNamePiece];
        }
        else {
            return configFallbackValues.get(propertyName);
        }
    }
    return currentObj;
}
exports.getProperty = getProperty;

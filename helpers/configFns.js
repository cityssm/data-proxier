"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProperty = void 0;
const config = require("../data/config");
const configFallbackValues = new Map();
configFallbackValues.set("application.httpPort", 6474);
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

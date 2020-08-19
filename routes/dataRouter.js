"use strict";
const log = require("fancy-log");
const express_1 = require("express");
const map_expire_1 = require("@cityssm/map-expire");
const mssqlGetter = require("../getters/mssqlGetter");
let config;
try {
    config = require("../data/config");
}
catch (_e) {
    log.warn("Using data/config-sample.js");
    config = require("../data/config-sample");
}
const router = express_1.Router();
const dataCache = new map_expire_1.Cache(10);
router.all("/", (_req, res) => {
    res.json({
        success: true,
        message: "Ready"
    });
});
router.all("/:dataName", (req, res) => {
    const dataName = req.params.dataName;
    const dataConfig = config.data[dataName];
    if (!dataConfig) {
        return res.json({
            success: false,
            message: "Data configuration not found: " + dataName
        });
    }
    if (dataConfig.cacheSeconds > 0) {
        const data = dataCache.get(dataName);
        if (data) {
            return res.json({
                success: true,
                fromCache: true,
                data
            });
        }
    }
    const credentialConfig = config.credentials[dataConfig.credentialName];
    if (!credentialConfig) {
        return res.json({
            success: false,
            message: "Credential configuration not found: " + dataConfig.credentialName
        });
    }
    switch (credentialConfig.credentialType) {
        case "mssql":
            mssqlGetter.getData(req.query, dataConfig, credentialConfig, function (resultJSON) {
                if (resultJSON.success) {
                    if (dataConfig.cacheSeconds > 0) {
                        dataCache.set(dataName, resultJSON.data, dataConfig.cacheSeconds);
                    }
                    return res.json({
                        success: true,
                        fromCache: false,
                        data: resultJSON.data
                    });
                }
                else {
                    return res.json({
                        success: false,
                        message: resultJSON.message
                    });
                }
            });
            break;
        default:
            return res.json({
                success: false,
                message: "Unknown credentialType: " + credentialConfig.credentialType
            });
    }
});
module.exports = router;

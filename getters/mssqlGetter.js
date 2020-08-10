"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const sql = require("mssql");
exports.getData = (reqQuery, dataConfig, credentialConfig, callbackFn) => {
    sql.connect(credentialConfig.config, (err) => {
        if (err) {
            callbackFn({
                success: false,
                message: "Connection Error",
                error: err
            });
            return;
        }
        const sqlQuery = dataConfig.query(dataConfig.configParams, reqQuery);
        new sql.Request().query(sqlQuery, (err, result) => {
            if (err) {
                callbackFn({
                    success: false,
                    message: "Query Error",
                    error: err
                });
                return;
            }
            callbackFn({
                success: true,
                data: result.recordset
            });
        });
    });
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const configFns = require("../helpers/configFns");
const sql = require("@cityssm/mssql-multi-pool");
async function getData(reqQuery, dataConfig) {
    const connectionConfig = configFns.getProperty("credentials")[dataConfig.credentialName].config;
    try {
        const sqlQuery = dataConfig.query(dataConfig.configParams, reqQuery);
        const pool = await sql.connect(connectionConfig);
        const result = await pool.request().query(sqlQuery);
        return {
            success: true,
            data: result.recordset
        };
    }
    catch (e) {
        return {
            success: false,
            message: "Query Error",
            error: e
        };
    }
}
exports.getData = getData;
;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const configFns = require("../helpers/configFns");
const sql = require("@cityssm/mssql-multi-pool");
function getData(reqQuery, dataConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        const connectionConfig = configFns.getProperty("credentials")[dataConfig.credentialName].config;
        try {
            const sqlQuery = dataConfig.query(dataConfig.configParams, reqQuery);
            const pool = yield sql.connect(connectionConfig);
            const result = yield pool.request().query(sqlQuery);
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
    });
}
exports.getData = getData;
;

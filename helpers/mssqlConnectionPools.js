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
exports.getPool = exports.closePool = void 0;
const mssql_1 = require("mssql");
const configFns = require("./configFns");
const POOLS = {};
function createPool(credentialName) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentials = configFns.getProperty("credentials")[credentialName];
        if (credentials) {
            const pool = yield (new mssql_1.ConnectionPool(credentials.config)).connect();
            POOLS[credentialName] = pool;
            return pool;
        }
        return null;
    });
}
function closePool(credentialName) {
    if (POOLS[credentialName]) {
        const pool = POOLS[credentialName];
        delete POOLS[credentialName];
        return pool.close();
    }
}
exports.closePool = closePool;
function getPool(credentialName) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!POOLS[credentialName]) {
            yield createPool(credentialName);
        }
        return POOLS[credentialName];
    });
}
exports.getPool = getPool;

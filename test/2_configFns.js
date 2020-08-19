"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const configFns = require("../helpers/configFns");
describe("configFns", () => {
    describe("#getProperty", () => {
        it("Includes string[] value for property \"whitelistIPs\"", () => {
            assert.equal(typeof configFns.getProperty("whitelistIPs"), "object");
        });
    });
});

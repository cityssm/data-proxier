import * as assert from "assert";

import * as configFns from "../helpers/configFns";


describe("configFns", () => {

  describe("#getProperty", () => {
    it("Includes string[] value for property \"whitelistIPs\"", () => {
      assert.strictEqual(typeof configFns.getProperty("whitelistIPs"), "object");
    });
  });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_windows_1 = require("node-windows");
const windowsServiceConfig_1 = require("./windowsServiceConfig");
var svc = new node_windows_1.Service(windowsServiceConfig_1.windowsServiceConfig);
svc.on("uninstall", function () {
    console.log("Uninstall complete.");
    console.log("The service exists: ", svc.exists);
});
svc.uninstall();

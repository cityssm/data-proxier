"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_windows_1 = require("node-windows");
const windowsServiceConfig_1 = require("./windowsServiceConfig");
const svc = new node_windows_1.Service(windowsServiceConfig_1.windowsServiceConfig);
svc.on("install", () => {
    svc.start();
});
svc.install();

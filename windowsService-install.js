import { Service } from 'node-windows';
import { windowsServiceConfig } from './windowsServiceConfig.js';
const svc = new Service(windowsServiceConfig);
svc.on('install', () => {
    svc.start();
});
svc.install();

import { Service } from 'node-windows';
import { windowsServiceConfig } from './windowsServiceConfig.js';
const svc = new Service(windowsServiceConfig);
svc.on('uninstall', () => {
    console.log('Uninstall complete.');
    console.log('The service exists:', svc.exists);
});
svc.uninstall();

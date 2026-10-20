/* eslint-disable unicorn/filename-case */
/* eslint-disable no-console */

import { Service } from 'node-windows'

import { windowsServiceConfig } from './windowsServiceConfig.js'

// Create a new service object
const svc = new Service(windowsServiceConfig)

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall', () => {
  console.log('Uninstall complete.')
  console.log('The service exists:', svc.exists)
})

// Uninstall the service.
svc.uninstall()

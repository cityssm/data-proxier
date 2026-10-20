#!/usr/bin/env node
import fs from 'node:fs';
import http from 'node:http';
import https from 'node:https';
import Debug from 'debug';
import getApp from './app.js';
import { DEBUG_ENABLE_NAMESPACES, DEBUG_NAMESPACE } from './debug.config.js';
import { getConfigProperty } from './helpers/config.functions.js';
if (process.env.NODE_ENV === 'development') {
    Debug.enable(DEBUG_ENABLE_NAMESPACES);
}
const debug = Debug(`${DEBUG_NAMESPACE}:www`);
const app = getApp();
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    switch (error.code) {
        case 'EACCES': {
            debug('Requires elevated privileges');
            process.exit(1);
        }
        case 'EADDRINUSE': {
            debug('Port is already in use.');
            process.exit(1);
        }
        default: {
            throw error;
        }
    }
}
function onListening(server) {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port.toString()}`;
    debug(`Listening on ${bind}`);
}
const httpPort = getConfigProperty('application.httpPort');
if (httpPort) {
    const httpServer = http.createServer(app);
    httpServer.listen(httpPort);
    httpServer.on('error', onError);
    httpServer.on('listening', () => {
        onListening(httpServer);
    });
    debug(`HTTP listening on ${httpPort.toString()}`);
}
const httpsConfig = getConfigProperty('application.https');
if (httpsConfig !== undefined) {
    const httpsServer = https.createServer({
        key: fs.readFileSync(httpsConfig.keyPath),
        cert: fs.readFileSync(httpsConfig.certPath),
        passphrase: httpsConfig.passphrase
    }, app);
    httpsServer.listen(httpsConfig.port);
    httpsServer.on('error', onError);
    httpsServer.on('listening', () => {
        onListening(httpsServer);
    });
    debug(`HTTPS listening on ${httpsConfig.port.toString()}`);
}

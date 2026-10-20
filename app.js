import { isLocal } from '@cityssm/is-private-network-address';
import compression from 'compression';
import Debug from 'debug';
import express from 'express';
import { DEBUG_NAMESPACE } from './debug.config.js';
import { getConfigProperty } from './helpers/config.functions.js';
import getDataRouter from './routes/dataRouter.js';
const debug = Debug(`${DEBUG_NAMESPACE}:app`);
export default function getApp() {
    const app = express();
    app.use(compression());
    app.use(express.urlencoded({
        extended: false
    }));
    app.use('/', (request, response, next) => {
        debug(request.ip);
        const ipAddress = request.ip?.split(':').pop();
        if (ipAddress !== undefined &&
            (isLocal(ipAddress) ||
                getConfigProperty('whitelistIPs').includes(ipAddress))) {
            next();
            return;
        }
        return response.json({
            success: false,
            message: `IP address not allowed: ${ipAddress}`
        });
    }, getDataRouter());
    return app;
}

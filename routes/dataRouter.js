import { NodeCache } from '@cacheable/node-cache';
import { Router } from 'express';
import * as mssqlGetter from '../getters/mssqlGetter.js';
import { getConfigProperty } from '../helpers/config.functions.js';
export default function getDataRouter() {
    const router = Router();
    const dataCache = new NodeCache({
        stdTTL: 30
    });
    const credentialsConfigs = getConfigProperty('credentials');
    const dataConfigs = getConfigProperty('data');
    router.all('/', (_request, response) => {
        response.json({
            success: true,
            message: 'Ready'
        });
    });
    router.all('/:dataName', async (request, response) => {
        const dataName = request.params.dataName;
        const dataConfig = dataConfigs[dataName];
        if (dataConfig === undefined) {
            return response.json({
                success: false,
                message: `Data configuration not found: ${dataName}`
            });
        }
        if (dataConfig.cacheSeconds > 0) {
            const data = dataCache.get(dataName);
            if (data !== undefined) {
                return response.json({
                    success: true,
                    data,
                    fromCache: true
                });
            }
        }
        const credentialConfig = credentialsConfigs[dataConfig.credentialName];
        if (credentialConfig === undefined) {
            return response.json({
                success: false,
                message: `Credential configuration not found: ${dataConfig.credentialName}`
            });
        }
        let result;
        switch (credentialConfig.credentialType) {
            case 'mssql': {
                result = await mssqlGetter.getData(request.query, dataConfig);
                break;
            }
            default: {
                response.json({
                    success: false,
                    message: `Unknown credentialType: ${credentialConfig.credentialType}`
                });
                return;
            }
        }
        if (result.success) {
            if (dataConfig.cacheSeconds > 0) {
                dataCache.set(dataName, result.data, dataConfig.cacheSeconds);
            }
            response.json({
                success: true,
                data: result.data,
                fromCache: false
            });
        }
        else {
            response.json({
                success: false,
                error: result.error,
                message: result.message
            });
        }
    });
    return router;
}

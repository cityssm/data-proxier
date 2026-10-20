import mssql from '@cityssm/mssql-multi-pool';
import { getConfigProperty } from '../helpers/config.functions.js';
const credentialsConfigs = getConfigProperty('credentials');
export async function getData(requestQuery, dataConfig) {
    const connectionConfig = credentialsConfigs[dataConfig.credentialName]?.config;
    try {
        if (connectionConfig === undefined) {
            throw new Error('Missing connection configuration');
        }
        const sqlQuery = dataConfig.query(dataConfig.configParams ?? {}, requestQuery);
        const pool = await mssql.connect(connectionConfig);
        const result = await pool.request().query(sqlQuery);
        return {
            success: true,
            data: result.recordset
        };
    }
    catch (error) {
        return {
            success: false,
            error,
            message: 'Query Error'
        };
    }
}

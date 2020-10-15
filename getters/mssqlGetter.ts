import * as mssqlConnectionPools from "../helpers/mssqlConnectionPools";


import type { ConfigData, GetData_Return_Success, GetData_Return_Error } from "../helpers/types";


export async function getData(reqQuery: { [paramName: string]: any },
  dataConfig: ConfigData): Promise<GetData_Return_Success | GetData_Return_Error> {

  try {
    const sqlQuery = dataConfig.query(dataConfig.configParams, reqQuery);

    const pool = await mssqlConnectionPools.getPool(dataConfig.credentialName);

    const result = await pool.request().query(sqlQuery);

    return {
      success: true,
      data: result.recordset
    };

  } catch (e) {

    return {
      success: false,
      message: "Query Error",
      error: e
    };
  }
};

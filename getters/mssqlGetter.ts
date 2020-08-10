import * as sql from "mssql";

import type { ConfigData, ConfigCredentials } from "../helpers/types";


export const getData = (reqQuery: { [paramName: string]: any },
  dataConfig: ConfigData,
  credentialConfig: ConfigCredentials,
  callbackFn: (result: {
    success: boolean;
    message?: string;
    error?: Error;
    data?: Array<{ [columnName: string]: any }>;
  }) => void) => {

  sql.connect(credentialConfig.config, (err: Error) => {

    if (err) {
      callbackFn({
        success: false,
        message: "Connection Error",
        error: err
      });

      return;
    }

    const sqlQuery = dataConfig.query(dataConfig.configParams, reqQuery);

    new sql.Request().query(sqlQuery, (err: Error, result) => {

      if (err) {
        callbackFn({
          success: false,
          message: "Query Error",
          error: err
        });

        return;
      }

      callbackFn({
        success: true,
        data: result.recordset
      });
    });
  });
};

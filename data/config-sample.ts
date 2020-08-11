import type { Config } from "../helpers/types";

const config: Config = {

  credentials: {
    databaseA: {
      credentialType: "mssql",
      config: {
        user: "userName",
        password: "p@ssword",
        server: "192.168.123.45",
        database: "database",
        options: {
          encrypt: true,
          enableArithAbort: true
        }
      }
    }
  },

  data: {
    usersQuery: {
      credentialName: "databaseA",
      cacheSeconds: 10,
      query: (configParams, _getParams) => {

        const sql = "select top " + (configParams.limit as number).toString() +
          " firstName, lastName, loginTime" +
          " from Users" +
          " order by loginTime desc";

        return sql;
      },
      configParams: {
        limit: 10
      }
    }
  },

  whitelistIPs: []
};

export = config;

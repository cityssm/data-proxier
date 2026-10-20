import type { Config } from '../helpers/types.js'

export default {
  credentials: {
    databaseA: {
      credentialType: 'mssql',

      config: {
        user: 'userName',
        password: 'p@ssword',
        server: '192.168.123.45',
        database: 'database',
        options: {
          encrypt: true,
          enableArithAbort: true
        }
      }
    }
  },

  data: {
    usersQuery: {
      credentialName: 'databaseA',
      cacheSeconds: 10,
      query: (configParameters, _getParameters) => {
        const sql = /* sql */ `
          SELECT
            TOP ${(configParameters.limit as number).toString()} firstName,
            lastName,
            loginTime
          FROM
            Users
          ORDER BY
            loginTime DESC
        `

        return sql
      },

      configParams: {
        limit: 10
      }
    }
  },

  whitelistIPs: []
} satisfies Config

import { NodeCache } from '@cacheable/node-cache'
import { Router } from 'express'

import * as mssqlGetter from '../getters/mssqlGetter.js'
import { getConfigProperty } from '../helpers/config.functions.js'
import type {
  GetDataResponseError,
  GetDataResponseSuccess
} from '../helpers/types.js'

export default function getDataRouter(): Router {
  const router = Router()

  const dataCache = new NodeCache({
    stdTTL: 30 // Default cache time-to-live in seconds
  })

  const credentialsConfigs = getConfigProperty('credentials')
  const dataConfigs = getConfigProperty('data')

  router.all('/', (_request, response) => {
    response.json({
      success: true,

      message: 'Ready'
    })
  })

  router.all('/:dataName', async (request, response) => {
    const dataName = request.params.dataName

    // Load the data configuration

    const dataConfig = dataConfigs[dataName]

    if (dataConfig === undefined) {
      return response.json({
        success: false,

        message: `Data configuration not found: ${dataName}`
      })
    }

    // Check the cache

    if (dataConfig.cacheSeconds > 0) {
      const data = dataCache.get(dataName)

      if (data !== undefined) {
        return response.json({
          success: true,

          data,
          fromCache: true
        })
      }
    }

    // Load the credentials

    const credentialConfig = credentialsConfigs[dataConfig.credentialName]

    if (credentialConfig === undefined) {
      return response.json({
        success: false,

        message: `Credential configuration not found: ${dataConfig.credentialName}`
      })
    }

    // Get the data

    let result: GetDataResponseError | GetDataResponseSuccess

    // eslint-disable-next-line sonarjs/no-small-switch
    switch (credentialConfig.credentialType) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      case 'mssql': {
        result = await mssqlGetter.getData(request.query, dataConfig)
        break
      }

      // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
      default: {
        response.json({
          success: false,

          message: `Unknown credentialType: ${
            credentialConfig.credentialType as string
          }`
        })

        return
      }
    }

    if (result.success) {
      if (dataConfig.cacheSeconds > 0) {
        dataCache.set(dataName, result.data, dataConfig.cacheSeconds)
      }

      response.json({
        success: true,

        data: result.data,
        fromCache: false
      })
    } else {
      response.json({
        success: false,

        error: (result as GetDataResponseError).error,
        message: (result as GetDataResponseError).message
      })
    }
  })

  return router
}

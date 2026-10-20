/* eslint-disable unicorn/name-replacements */

import type { config as MSSQLDatabaseConfig } from 'mssql'

export interface Config {
  application?: ConfigApplication

  credentials: Record<string, ConfigCredentials>

  data: Record<string, ConfigData>

  whitelistIPs: string[]
}

interface ConfigApplication {
  httpPort?: number
  https?: ConfigHTTPS
}

export interface ConfigHTTPS {
  port: number
  keyPath: string
  certPath: string
  passphrase?: string
}

export interface ConfigCredentials {
  credentialType: 'mssql'
  config: MSSQLDatabaseConfig
}

export interface ConfigData {
  credentialName: string
  cacheSeconds: number

  query: (
    configParameters: Record<string, unknown>,
    getParameters: Record<string, string>
  ) => string

  configParams?: Record<string, unknown>
}

export interface GetDataResponseSuccess {
  success: true

  data: Array<Record<string, unknown>>
}

export interface GetDataResponseError {
  success: false

  error: unknown
  message: string
}

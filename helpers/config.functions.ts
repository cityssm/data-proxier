import Debug from 'debug'

import { DEBUG_NAMESPACE } from '../debug.config.js'

import type * as types from './types.js'

const debug = Debug(`${DEBUG_NAMESPACE}:config.functions`)

/*
 * LOAD CONFIGURATION
 */

let config: types.Config

try {
  const configImport = await import('../data/config.js')
  config = configImport.default
} catch {
  debug('Using data/configSample.js')

  const configImport = await import('../data/configSample.js')
  config = configImport.default
}

const configFallbackValues = new Map<string, unknown>([
  ['application.httpPort', 6474],
  ['whitelistIPs', []]
])

export function getConfigProperty(propertyName: 'application.httpPort'): number
export function getConfigProperty(propertyName: 'application.passcode'): string

export function getConfigProperty(
  propertyName: 'application.https'
): types.ConfigHTTPS | undefined

export function getConfigProperty(
  propertyName: 'credentials'
): Record<string, types.ConfigCredentials | undefined>

export function getConfigProperty(propertyName: 'whitelistIPs'): string[]

export function getConfigProperty(
  propertyName: 'data'
): Record<string, types.ConfigData | undefined>

export function getConfigProperty(propertyName: string): unknown {
  const propertyNameSplit = propertyName.split('.')

  let currentObject = config

  for (const propertyNamePiece of propertyNameSplit) {
    if (Object.hasOwn(currentObject, propertyNamePiece)) {
      currentObject = currentObject[propertyNamePiece]
    } else {
      return configFallbackValues.get(propertyName)
    }
  }

  return currentObject
}

export default {
  getConfigProperty
}

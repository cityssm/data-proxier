import * as log from "fancy-log";

import * as types from "./types";


/*
 * LOAD CONFIGURATION
 */

let config: types.Config;

try {
  config = require("../data/config");
} catch (_e) {
  log.warn("Using data/config-sample.js");
  config = require("../data/config-sample");
}


const configFallbackValues = new Map<string, any>();

configFallbackValues.set("application.httpPort", 6474);
configFallbackValues.set("whitelistIPs", []);


export function getProperty(propertyName: "application.httpPort"): number;
export function getProperty(propertyName: "application.passcode"): string;

export function getProperty(propertyName: "application.https"): types.ConfigHTTPS;

export function getProperty(propertyName: "credentials"): { [credentialName: string]: types.ConfigCredentials };

export function getProperty(propertyName: "whitelistIPs"): string[];

export function getProperty(propertyName: string): any {

  const propertyNameSplit = propertyName.split(".");

  let currentObj = config;

  for (const propertyNamePiece of propertyNameSplit) {

    if (currentObj.hasOwnProperty(propertyNamePiece)) {
      currentObj = currentObj[propertyNamePiece];
    } else {
      return configFallbackValues.get(propertyName);
    }
  }

  return currentObj;

}

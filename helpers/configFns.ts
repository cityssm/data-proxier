import * as types from "./types";

import * as config from "../data/config";

const configFallbackValues = new Map<string, any>();

configFallbackValues.set("application.httpPort", 6474);


export function getProperty(propertyName: "application.httpPort"): number;
export function getProperty(propertyName: "application.passcode"): string;

export function getProperty(propertyName: "application.https"): types.ConfigHTTPS;

export function getProperty(propertyName: "url"): string;

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

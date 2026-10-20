import Debug from 'debug';
import { DEBUG_NAMESPACE } from '../debug.config.js';
const debug = Debug(`${DEBUG_NAMESPACE}:config.functions`);
let config;
try {
    const configImport = await import('../data/config.js');
    config = configImport.default;
}
catch {
    debug('Using data/configSample.js');
    const configImport = await import('../data/configSample.js');
    config = configImport.default;
}
const configFallbackValues = new Map([
    ['application.httpPort', 6474],
    ['whitelistIPs', []]
]);
export function getConfigProperty(propertyName) {
    const propertyNameSplit = propertyName.split('.');
    let currentObject = config;
    for (const propertyNamePiece of propertyNameSplit) {
        if (Object.hasOwn(currentObject, propertyNamePiece)) {
            currentObject = currentObject[propertyNamePiece];
        }
        else {
            return configFallbackValues.get(propertyName);
        }
    }
    return currentObject;
}
export default {
    getConfigProperty
};

import type { ConfigData, ConfigCredentials } from "../helpers/types";
export declare const getData: (reqQuery: {
    [paramName: string]: any;
}, dataConfig: ConfigData, credentialConfig: ConfigCredentials, callbackFn: (result: {
    success: boolean;
    message?: string;
    error?: Error;
    data?: {
        [columnName: string]: any;
    }[];
}) => void) => void;

import type { config as MSSQLDatabaseConfig } from "mssql";

export interface Config {
  application?: ConfigApplication;

  credentials: {
    [credentialName: string]: ConfigCredentials;
  };

  data: {
    [dataName: string]: ConfigData;
  };

  whitelistIPs: string[];
}

interface ConfigApplication {
  httpPort?: number;
  https?: ConfigHTTPS;
}

export interface ConfigHTTPS {
  port: number;
  keyPath: string;
  certPath: string;
  passphrase?: string;
}

export interface ConfigCredentials {
  credentialType: "mssql";
  config: MSSQLDatabaseConfig;
}

export interface ConfigData {
  credentialName: string;
  cacheSeconds: number;
  query?: (configParams: { [paramName: string]: any }, getParams: { [paramName: string]: string }) => string;
  configParams?: { [paramName: string]: any };
}

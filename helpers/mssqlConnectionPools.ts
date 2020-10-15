import { ConnectionPool } from "mssql";

import * as configFns from "./configFns";


const POOLS = {};


async function createPool(credentialName: string) {

  const credentials = configFns.getProperty("credentials")[credentialName];

  if (credentials) {
    const pool = await (new ConnectionPool(credentials.config)).connect();

    POOLS[credentialName] = pool;

    return pool;
  }

  return null;
}

export function closePool(credentialName: string) {

  if (POOLS[credentialName]) {

    const pool = POOLS[credentialName];

    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete POOLS[credentialName];

    return pool.close();
  }
}

export async function getPool(credentialName: string) {

  if (!POOLS[credentialName]) {
    await createPool(credentialName);
  }

  return POOLS[credentialName];
}

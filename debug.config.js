import { DEBUG_ENABLE_NAMESPACES as DEBUG_ENABLE_NAMESPACES_MSSQL_MULTI_POOL } from '@cityssm/mssql-multi-pool/debug';
export const DEBUG_NAMESPACE = 'data-proxier';
export const DEBUG_ENABLE_NAMESPACES = [
    `${DEBUG_NAMESPACE}:*`,
    DEBUG_ENABLE_NAMESPACES_MSSQL_MULTI_POOL
].join(',');
export const PROCESS_ID_MAX_DIGITS = 5;

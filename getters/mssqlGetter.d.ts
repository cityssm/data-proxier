import type { ConfigData, GetData_Return_Success, GetData_Return_Error } from "../helpers/types";
export declare function getData(reqQuery: {
    [paramName: string]: any;
}, dataConfig: ConfigData): Promise<GetData_Return_Success | GetData_Return_Error>;

import * as log from "fancy-log";
import { Router } from "express";
import { Cache } from "@cityssm/map-expire";

import * as mssqlGetter from "../getters/mssqlGetter";

import type { Config, GetData_Return_Success, GetData_Return_Error } from "../helpers/types";

// Load config

let config: Config;

try {
  config = require("../data/config");
} catch (_e) {
  log.warn("Using data/config-sample.js");
  config = require("../data/config-sample");
}

Object.freeze(config);


const router = Router();
const dataCache = new Cache(10);


router.all("/", (_req, res) => {
  res.json({
    success: true,
    message: "Ready"
  });
});


router.all("/:dataName", async(req, res) => {

  const dataName = req.params.dataName;

  // Load the data configuration

  const dataConfig = config.data[dataName];

  if (!dataConfig) {

    return res.json({
      success: false,
      message: "Data configuration not found: " + dataName
    });
  }

  // Check the cache

  if (dataConfig.cacheSeconds > 0) {

    const data = dataCache.get(dataName);

    if (data) {
      return res.json({
        success: true,
        fromCache: true,
        data
      });
    }
  }

  // Load the credentials

  const credentialConfig = config.credentials[dataConfig.credentialName];

  if (!credentialConfig) {

    return res.json({
      success: false,
      message: "Credential configuration not found: " + dataConfig.credentialName
    });
  }

  // Get the data

  let result: GetData_Return_Success | GetData_Return_Error;

  switch (credentialConfig.credentialType) {

    case "mssql":

      result = await mssqlGetter.getData(req.query, dataConfig);
      break;

    default:
      return res.json({
        success: false,
        message: "Unknown credentialType: " + (credentialConfig.credentialType as string)
      });
  }

  if (result.success) {

    if (dataConfig.cacheSeconds > 0) {
      dataCache.set(dataName, result.data, dataConfig.cacheSeconds);
    }

    return res.json({
      success: true,
      fromCache: false,
      data: result.data
    });

  } else {
    return res.json({
      success: false,
      message: (result as GetData_Return_Error).message,
      error: (result as GetData_Return_Error).error
    });
  }
});


export = router;

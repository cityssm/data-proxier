import * as log from "fancy-log";
import { Router } from "express";
import { Cache } from "@cityssm/map-expire";

import * as mssqlGetter from "../getters/mssqlGetter";

import type { Config } from "../helpers/types";

// Load config

let config: Config;

try {
  config = require("../data/config");
} catch (_e) {
  log.warn("Using data/config-sample.js");
  config = require("../data/config-sample");
}


const router = Router();
const dataCache = new Cache(10);


router.all("/", (_req, res) => {
  res.json({
    success: true,
    message: "Ready"
  });
});


router.all("/:dataName", (req, res) => {

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

  switch (credentialConfig.credentialType) {

    case "mssql":

      mssqlGetter.getData(req.query, dataConfig, credentialConfig, function(resultJSON) {

        if (resultJSON.success) {

          if (dataConfig.cacheSeconds > 0) {
            dataCache.set(dataName, resultJSON.data, dataConfig.cacheSeconds);
          }

          return res.json({
            success: true,
            fromCache: false,
            data: resultJSON.data
          });

        } else {
          return res.json({
            success: false,
            message: resultJSON.message,
            error: resultJSON.error
          });
        }
      });

      break;

    default:
      return res.json({
        success: false,
        message: "Unknown credentialType: " + (credentialConfig.credentialType as string)
      });
  }
});


export = router;

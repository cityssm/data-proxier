import * as express from "express";
import * as compression from "compression";

import * as configFns from "./helpers/configFns";

import * as routerData from "./routes/dataRouter";


const app = express();

app.use(compression());

app.use(express.urlencoded({
  extended: false
}));


const ipChecker = (req: express.Request, res: express.Response, next: express.NextFunction) => {

  const ipAddress = req.ip.split(":").pop();

  if (configFns.getProperty("whitelistIPs").includes(ipAddress)) {
    return next();
  }

  return res.json({
    success: false,
    message: "IP address not allowed: " + ipAddress
  });
};


app.use("/", ipChecker, routerData);


export = app;

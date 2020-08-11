import * as express from "express";
import * as compression from "compression";

import * as configFns from "./helpers/configFns";

import * as routerData from "./routes/dataRouter";


const app = express();

app.use(compression());

app.use(express.urlencoded({
  extended: false
}));

const localIPs = ["127.0.0.1", "1"];


const ipChecker = (req: express.Request, res: express.Response, next: express.NextFunction) => {

  console.log(req.ip);

  const ipAddress = req.ip.split(":").pop();

  if (localIPs.includes(ipAddress) ||
    configFns.getProperty("whitelistIPs").includes(ipAddress)) {
    return next();
  }

  return res.json({
    success: false,
    message: "IP address not allowed: " + ipAddress
  });
};


app.use("/", ipChecker, routerData);


export = app;

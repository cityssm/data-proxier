import * as express from "express";
import * as compression from "compression";

import * as routerData from "./routes/dataRouter";

const app = express();

app.use(compression());

app.use(express.urlencoded({
  extended: false
}));

app.use("/", routerData);


export = app;

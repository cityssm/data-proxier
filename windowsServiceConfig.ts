import * as path from "path";


export const windowsServiceConfig = {
  name: "Data Proxier",
  description: "Limit the amount of data exposed using a database proxy. ",
  script: path.join(__dirname, "bin", "www.js")
};

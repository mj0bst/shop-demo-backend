require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
import express from "express";
import baseImport from "./model/baseImport";
import dbInit from "./model/init";
import shopItemRoute from "./route/shopItemRoute";

dbInit().then(async () => {
  await baseImport();

  const app = express();

  // mount the frontend
  app.use(express.static("frontend/build"));

  // parse requests of content-type - application/json
  app.use(express.json());

  const port = process.env.PORT; // default port to listen

  // define a route handler for the default home page
  app.get("/api/hello", (req, res) => {
    res.send("Hello world!");
  });

  // add the shop item routes
  shopItemRoute(app);

  // start the Express server
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
});

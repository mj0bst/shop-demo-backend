require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
import express from "express";
import cors from "cors";
import baseImport from "./model/baseImport";
import dbInit from "./model/init";
import shopItemRoute from "./route/shopItemRoute";
import path from 'path';

dbInit().then(async () => {
  await baseImport();

  const app = express();

  // mount the frontend
  app.use(express.static("frontend/build"));

  // use cors in order to run frontend and backend separately in dev
  if (process.env.NODE_ENV === "development.local") {
    app.use(
      cors({
        origin: "http://localhost:3000",
      })
    );
  }

  // parse requests of content-type - application/json
  app.use(express.json());

  const port = process.env.PORT; // default port to listen

  // add the shop item routes
  shopItemRoute(app);

  // mount the frontend
  app.use("/static", express.static(path.join(__dirname, "../frontend/build/static")));
  app.get("*", function (req, res) {
    res.sendFile("index.html", { root: path.join(__dirname, "../frontend/build/") });
  });

  // start the Express server
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
});

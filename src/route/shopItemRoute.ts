import express from "express";
import * as shopItemController from "../controller/shopItemController";

export default (app: express.Express) => {
  var router = require("express").Router();

  router.post("/", shopItemController.create);
  router.get("/", shopItemController.findAllByName);
  router.get("/:id", shopItemController.findOneById);
  router.put("/:id", shopItemController.updateById);
  router.delete("/:id", shopItemController.deleteById);

  app.use("/api/shopItem", router);
};

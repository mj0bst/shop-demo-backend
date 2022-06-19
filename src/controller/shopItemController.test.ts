import * as express from "express";
import { Op } from "sequelize";

import ShopItem from "../model/shopItem";
const create = jest.fn();
const findAll = jest.fn();
jest.mock("../model/shopItem", () => {
  return { create, findAll };
});

import * as shopItemController from "./shopItemController";

const shopItemWithoutId = {
  name: "item",
  description: "this is an item",
  price: 1.2,
  stock: 10,
};
const shopItemWithId = {
  id: "this-is-a-uuid",
  name: "item",
  description: "this is an item",
  price: 1.2,
  stock: 10,
};

describe("ShopItem controller", () => {
  it("create() should return the created item on creation, together with a new id", async () => {
    create.mockImplementation().mockResolvedValue(shopItemWithId);

    const req = {
      body: shopItemWithoutId,
    } as express.Request;
    const res = {} as express.Response;
    res.status = jest.fn().mockReturnThis();
    res.send = jest.fn();

    await shopItemController.create(req, res);

    expect(create).toHaveBeenCalledTimes(1);
    expect(create).toHaveBeenCalledWith(shopItemWithoutId);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith(shopItemWithId);
  });

  it.each([
    [{}, null,],
    [{name: "item"}, {name:{[Op.like]: "%item%"}},],
    [{name: "item", exact: "true"}, {name:{[Op.eq]: "item"}},],
  ])("findAllByName() should search for query %o with where-clause %o", async (query, where) => {
    findAll.mockImplementation().mockResolvedValue([shopItemWithId]);

    const req = {query} as express.Request;
    const res = {} as express.Response;
    res.status = jest.fn().mockReturnThis();
    res.send = jest.fn();

    await shopItemController.findAllByName(req, res);
    
    expect(findAll).toHaveBeenCalledTimes(1);
    expect(findAll).toHaveBeenCalledWith({ where });
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith([shopItemWithId]);
  });
});

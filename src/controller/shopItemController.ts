import * as express from "express";
import { Op } from "sequelize";
import ShopItem from "../model/shopItem";

/**
 * Create and save a new ShopItem.
 */
async function create(req: express.Request, res: express.Response) {
  await ShopItem.create(req.body)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the ShopItem.",
      });
    });
}

/**
 * Retrieve all ShopItems from the database, filtered by the name in the query string.
 * If the query string contains exact = true, search for exactly the given name,
 * otherwise search for shopItems containing the given name as substring.
 */
async function findAllByName(req: express.Request, res: express.Response) {
  const exact = req.query.exact;
  const name = req.query.name;
  var condition = name ? { name: exact ? { [Op.eq]: name } : { [Op.like]: `%${name}%` } } : null;
  await ShopItem.findAll({ where: condition })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving ShopItems.",
      });
    });
}

/**
 * Find a single ShopItem by the id in the request path parameters.
 */
async function findOneById(req: express.Request, res: express.Response) {
  const id = req.params.id;
  await ShopItem.findByPk(id)
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({
          message: `Could not find ShopItem with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving ShopItem with id=" + id,
      });
    });
}

/**
 * Update a ShopItem by the id in the request path parameters.
 */
async function updateById(req: express.Request, res: express.Response) {
  const id = req.params.id;
  await ShopItem.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num[0] == 1) {
        res.status(200).send({
          message: "ShopItem was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Could not find ShopItem with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating ShopItem with id=${id}.`,
      });
    });
}

/**
 * Delete a ShopItem by the id in the request path parameters.
 */
async function deleteById(req: express.Request, res: express.Response) {
  const id = req.params.id;
  await ShopItem.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "ShopItem was deleted successfully!",
        });
      } else {
        console.log(num);
        res.status(404).send({
          message: `Could not find ShopItem with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Could not delete ShopItem with id=" + id,
      });
    });
}

export { create, findAllByName, findOneById, updateById, deleteById };

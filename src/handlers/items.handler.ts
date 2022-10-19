import express, { Request, Response } from "express";
import { make } from "simple-body-validator";
import { Item, ItemStore } from "../models/items.model";
import dotenv from "dotenv";

dotenv.config();

const store = new ItemStore();

// Adds Items to todo List
const create = async (req: Request, res: Response) => {
  try {
    const item: Item = {
      name: req.body.name,
      isCompleted: req.body.isCompleted,
      description: req.body.description,
      todoId: req.body.todoId,
    };

    // rules for Items
    const rules = {
      name: "required|string|min:3",
      isCompleted: "required|Boolean",
      description: "string|min:3",
      todoId: "required",
    };

    const validator = make(item, rules);

    if (!validator.validate()) {
      res.json(`Errors: ,${validator.errors().first()}`);
    } else {
      const newItem = await store.create(item);
      if (newItem) {
        res.json(newItem);
      } else {
        res.json(`The Todo List Cannot be found in the database`);
      }
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const itemRoutes = (app: express.Application) => {
  app.post("/todoItem", create);
};

export default itemRoutes;

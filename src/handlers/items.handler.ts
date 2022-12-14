import express, { Request, Response } from "express";
import { make } from "simple-body-validator";
import { Item, ItemStore } from "../models/items.model";
import dotenv from "dotenv";

dotenv.config();

const store = new ItemStore();

// Shows todoItems for todo list by todoId
const todoItems = async (req: Request, res: Response) => {
  const todoItems = await store.todoItems(req.params.id);

  if (todoItems) {
    res.json(todoItems);
  } else {
    res.json(`This Todo List has no items in it`);
  }
};

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

// Update Todo List's Item by id
const update = async (req: Request, res: Response) => {
  try {
    const item: Item = {
      id: parseInt(req.params.id),
      name: req.body.name,
      isCompleted: req.body.isCompleted,
      description: req.body.description,
      todoId: req.body.todoId,
    };

    // rules for todoItem
    const rules = {
      id: "required",
      name: "required|string|min:3",
      isCompleted: "required|Boolean",
      description: "string|min:3",
      todoId: "required",
    };

    const validator = make(item, rules);

    if (!validator.validate()) {
      res.json(`Errors: ,${validator.errors().first()}`);
    } else {
      const newTodoItem = await store.update(item);
      if (newTodoItem) {
        res.json(newTodoItem);
      } else {
        res.json("There is no todo lists assigned to this id");
      }
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// Update isCompleted of a Todo List's item by id
const isCompleted = async (req: Request, res: Response) => {
  try {
    const item: Item = {
      id: parseInt(req.params.id),
      name: req.body.name,
      isCompleted: req.body.isCompleted,
      description: req.body.description,
      todoId: req.body.todoId,
    };

    // rules for Item List
    const rules = {
      id: "required",
      isCompleted: "required|Boolean",
    };

    const validator = make(item, rules);

    if (!validator.validate()) {
      res.json(`Errors: ,${validator.errors().first()}`);
    } else {
      const newItem = await store.isCompleted(item);

      // if all items completed assign it's todo list to completed
      const itemsIsNotCompleted = await store.checkIsCompleted(req.params.id);

      let itemsNotCount = Number(itemsIsNotCompleted.count);
      let itemTodoId = String(itemsIsNotCompleted.todoId);

      if (itemsNotCount < 1) {
        await store.todoIsCompleted(itemTodoId);
      }

      res.json(newItem);
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// Deletes Todo List item by id
const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.params.id);

  if (deleted) {
    res.json(`Item List ${deleted.name} Deleted Successfully`);
  } else {
    res.json(`This Item List is not in the Database`);
  }
};

const itemRoutes = (app: express.Application) => {
  app.post("/todoItem", create);
  app.get("/todoItem/:id", todoItems);
  app.delete("/todoItem/:id", destroy);
  app.put("/todoItemIsCompleted/:id", isCompleted);
  app.put("/todoItem/:id", update);
};

export default itemRoutes;

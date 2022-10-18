import express, { Request, Response } from "express";
import { make } from "simple-body-validator";
import { Todo, TodoStore } from "../models/todos.model";
import dotenv from "dotenv";

dotenv.config();

const store = new TodoStore();

const create = async (req: Request, res: Response) => {
  // Create a new Todo List
  try {
    const todo: Todo = {
      title: req.body.title,
      isCompleted: req.body.isCompleted,
      description: req.body.description,
    };
    // rules for Todo List
    const rules = {
      title: "required|string|min:3",
      isCompleted: "required|Boolean",
      description: "string|min:3",
    };

    const validator = make(todo, rules);

    if (!validator.validate()) {
      res.json(`Errors: ,${validator.errors().first()}`);
    } else {
      const newTodo = await store.create(todo);
      res.json(newTodo);
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// Updates Todo List items by id
const update = async (req: Request, res: Response) => {
  try {
    const todo: Todo = {
      id: parseInt(req.params.id),
      title: req.body.title,
      isCompleted: req.body.isCompleted,
      description: req.body.description,
    };

    // rules for Todo List
    const rules = {
      id: "required",
      title: "required|string|min:3",
      isCompleted: "required|Boolean",
      description: "string|min:3",
    };

    const validator = make(todo, rules);

    if (!validator.validate()) {
      res.json(`Errors: ,${validator.errors().first()}`);
    } else {
      const newTodo = await store.update(todo);
      res.json(newTodo);
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const todoRoutes = (app: express.Application) => {
  app.post("/todo", create);
  app.put("/todo/:id", update);
};

export default todoRoutes;
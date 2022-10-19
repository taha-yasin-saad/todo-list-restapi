import express, { Request, Response } from "express";
import { make } from "simple-body-validator";
import { Todo, TodoStore } from "../models/todos.model";
import dotenv from "dotenv";

dotenv.config();

const store = new TodoStore();


// Show Todo Lists
const index = async (req: Request, res: Response) => {
  const todos = await store.index();

  res.json(todos);
};


// Creates a new Todo List
const create = async (req: Request, res: Response) => {
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

// Updates Todo List by id
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
      if (newTodo) {
        res.json(newTodo);
      } else {
        res.json("There is no todo lists assigned to this id");
      }
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// Deletes Todo List by id
const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.params.id);

  if (deleted) {
    res.json(`Todo List ${deleted.title} Deleted Successfully`);
  } else {
    res.json(`This Todo List is not in the Database`);
  }
};

// Update isCompleted of a Todo List by id
const isCompleted = async (req: Request, res: Response) => {
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
      isCompleted: "required|Boolean",
    };

    const validator = make(todo, rules);

    if (!validator.validate()) {
      res.json(`Errors: ,${validator.errors().first()}`);
    } else {
      const newTodo = await store.isCompleted(todo);
      if (newTodo) {
        res.json(newTodo);
      } else {
        res.json("There is no todo lists assigned to this id");
      }
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const todoRoutes = (app: express.Application) => {
  app.get("/todo", index);
  app.post("/todo", create);
  app.put("/todo/:id", update);
  app.delete("/todo/:id", destroy);
  app.put("/todoIsCompleted/:id", isCompleted);
};

export default todoRoutes;

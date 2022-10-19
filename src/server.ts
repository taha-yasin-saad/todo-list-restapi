import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import todoRoutes from "./handlers/todos.handler";
import itemRoutes from "./handlers/items.handler";

const app: express.Application = express();
const address: string = "localhost:3000";

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

todoRoutes(app);
itemRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;

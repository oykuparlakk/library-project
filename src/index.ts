import express, {Request, Response} from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {Server} from "typescript-rest";
import routes from "./router/routes";



import './handlers';
import { TryDBConnect } from "./helpers";

export const app: express.Application = express();

app.use(cors());
app.use(bodyParser.json());

app.use(async (req: Request, res: Response, next) => {
  await TryDBConnect(() => {
    res.json({
      error: 'Database connection error, please try again later',
    });
  }, next);
});


Server.buildServices(app);
app.use(routes);


let port = parseInt(process.env.PORT || "");
if (isNaN(port) || port === 0) {
  port = 4000;
}


app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server Started at PORT: ${port}`);
});


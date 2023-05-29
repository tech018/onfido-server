import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { IbodyParser, IbodyParserText } from "./src/interface";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

import applicationRoutes from "./src/onfido/routes/applications";

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded(<IbodyParser>{
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.text(<IbodyParserText>{ limit: "200mb" }));
app.use(express.json());
app.use("/api/application", applicationRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Api test request is working");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

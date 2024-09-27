import express, { Application, Request } from "express";
import config from "./config";
import morgan from "morgan";
import indexRouter from "./routes";
import apiRouter from "./routes/api";
import authRouter from "./routes";

const app: Application = express();
const port = config.PORT;

if (config.ENV === "dev") {
  app.use(morgan("dev"));
}

app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

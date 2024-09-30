import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import prisma from "./prisma";
import config from "./config";
import errorsHandler from "./errors";
import pageNotfoundHandler from "./errors/pageNotFound.error";
import indexRouter from "./routes";
import apiRouter from "./routes/api";
import authRouter from "./routes/auth";
import statusRouter from "./routes/status";

const app: Application = express();
const port = config.port;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

if (config.envType === "dev") {
  app.use(morgan("dev"));
}

app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("/auth", authRouter);
app.use("/status", statusRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.use(errorsHandler);
app.use(pageNotfoundHandler);

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

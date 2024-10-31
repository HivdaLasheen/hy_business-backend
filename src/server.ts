import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import timeout from "connect-timeout";
import { rateLimit } from "express-rate-limit";
import config from "./config";
import errorsHandler from "./errors";
import pageNotfoundHandler from "./errors/pageNotFound.error";
import indexRouter from "./routes";
import apiRouter from "./routes/api";
import authRouter from "./routes/auth";
import statusRouter from "./routes/status";
import ms from "ms";
import HttpStatusCodes from "./config/httpStatusCodes";
import { setupSwagger } from './swagger';

const app: Application = express();
const limiter = rateLimit({
  windowMs: ms("15m"),
  limit: 100,
  message: {
    status: HttpStatusCodes.TOO_MANY_REQUESTS,
    message: "Too many requests, please try again later.",
  },
  headers: true,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:3001', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Add any other headers you need
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  timeout("60s", {
    respond: true,
  })
);

if (config.envType === "dev") {
  app.use(morgan("dev"));
} else if (config.envType === "prod") {
  app.use(morgan("combined"));
  app.use(limiter);
}

// Setup Swagger documentation
setupSwagger(app);

app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("/auth", authRouter);
app.use("/status", statusRouter);

app.use(errorsHandler);
app.use(pageNotfoundHandler);

export default app;

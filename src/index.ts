import fs from "fs";
import https from "https";
import app from "./server";
import config from "./config";
import prisma from "./prisma";
import unhandledRejection from "./errors/unhandledRejection.error";

const port = config.port;

if (config.envType === "prod") {
  const privateKey = fs.readFileSync(config.paths.ssl.key);
  const certificate = fs.readFileSync(config.paths.ssl.cert);

  https.createServer({ key: privateKey, cert: certificate }, app).listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`);
  });
} else {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

process.on("unhandledRejection", (reason: any, promise) => {
  const log = unhandledRejection(reason, promise);

  fs.writeFileSync("unhandledRejection.log", log, { flag: "a" });
  process.exit(1);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

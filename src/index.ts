import fs from "fs";
import https from "https";
import app from "./server";
import config from "./config";
import prisma from "./prisma";

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

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

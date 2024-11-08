import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express"; // Ensure this is imported from express
import config from "./config";

// Swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // Specify the OpenAPI version
    info: {
      title: "HY Business API",
      version: "1.0.0",
      description: "API documentation for the HY Business project",
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
      },
    ],
    components: {
      securitySchemes: {
        Bearer: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Optional, can specify the format as JWT
        },
      },
    },
  },
  apis: ["./src/routes/**/*.ts"], // Adjust the path to your route files as needed
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Setup Swagger UI middleware
export function setupSwagger(app: Application) {
  // Use Application type from express
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log("Swagger documentation available at /api-docs");
}

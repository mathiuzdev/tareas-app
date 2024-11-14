import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "API to manage tasks and tags, with JWT authentication.",
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis:
    process.env.NODE_ENV !== "development"
      ? ["./dist/routes/*.js"]
      : ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/docs.json", (_: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
    console.log(`Swagger JSON served at http://localhost:${port}/docs.json`);
  });
}

export default swaggerDocs;

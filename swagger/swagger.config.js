// swagger.config.js

import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "UMC_6th",
      version: "1.0.0",
      description: "9week",
    },
    servers: [
      {
        description: "SwaggerHub API Auto Mocking",
        url: "https://virtserver.swaggerhub.com/EMILYPARK0987_1/UMC_6th/1.0.0",
      },
      {
        description: "server address",
        url: "http://localhost:3000/api-docs/",
      },
    ],
    components: {
      schemas: {
        Error: {
          type: "object",
          properties: {
            status: {
              type: "integer",
              example: 400,
            },
            isSuccess: {
              type: "boolean",
              example: false,
            },
            code: {
              type: "integer",
              example: "COMMON001",
            },
            message: {
              type: "string",
              example: "잘못된 요청입니다",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

export default specs;

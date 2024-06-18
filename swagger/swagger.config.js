import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "UMC_6th",
      version: "1.0.0",
      description: "APIs for UMC 6th project",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
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

export { specs };

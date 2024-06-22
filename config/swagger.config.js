import yaml from "yamljs";
import path from "path";
import SwaggerJsdoc from "swagger-jsdoc";

// Load YAML files
const userSwaggerDocument = yaml.load(
  path.resolve("swagger/user.swagger.yaml")
);
const storeSwaggerDocument = yaml.load(
  path.resolve("swagger/store.swagger.yaml")
);

// Ensure components and schemas are defined
userSwaggerDocument.components = userSwaggerDocument.components || {};
userSwaggerDocument.components.schemas =
  userSwaggerDocument.components.schemas || {};

storeSwaggerDocument.components = storeSwaggerDocument.components || {};
storeSwaggerDocument.components.schemas =
  storeSwaggerDocument.components.schemas || {};

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "UMC Study API",
      version: "1.0.0",
      description: "UMC Study API with express, API 설명",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [], // 경로에 있는 js 파일을 가져오는 옵션을 비워둡니다.
};

// Combine the YAML documents
const combinedSwaggerDocument = {
  openapi: "3.0.0",
  info: options.definition.info,
  paths: {
    ...userSwaggerDocument.paths,
    ...storeSwaggerDocument.paths,
  },
  components: {
    schemas: {
      ...userSwaggerDocument.components.schemas,
      ...storeSwaggerDocument.components.schemas,
    },
  },
};

export const specs = combinedSwaggerDocument;

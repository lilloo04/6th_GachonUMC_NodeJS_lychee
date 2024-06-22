import express from "express";
import { tempRouter } from "./src/routes/temp.route.js";
import { userRouter } from "./src/routes/user.route.js";
import { storeRouter } from "./src/routes/store.route.js";
import { specs } from "./config/swagger.config.js";
import SwaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";

// BaseError 클래스와 status 객체 정의
class BaseError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const status = {
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/temp", tempRouter);
app.use("/user", userRouter);
app.use(express.urlencoded({ extended: false }));

// Swagger 설정
app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(specs));

app.use("/:storeId", storeRouter);

app.use((req, res, next) => {
  const err = new BaseError(status.NOT_FOUND, "Not Found");
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};

  const statusCode = err.status || status.INTERNAL_SERVER_ERROR;
  const errorMessage = {
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  };

  res.status(statusCode).json(errorMessage);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

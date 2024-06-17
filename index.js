import express from "express";
import { tempRouter } from "./src/routes/temp.route.js";
import { userRouter } from "./src/routes/user.route.js";
import { specs } from "./config/swagger.config.js";
import SwaggerUi from "swagger-ui-express";

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

// router 설정
app.use("/temp", tempRouter);
app.use("/user", userRouter);
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(specs));

// 존재하지 않는 경로에 대한 처리
app.use((req, res, next) => {
  const err = new BaseError(status.NOT_FOUND, "Not Found");
  next(err);
});

// error handling
app.use((err, req, res, next) => {
  // 템플릿 엔진 변수 설정
  res.locals.message = err.message;
  // 개발환경이면 에러를 출력하고 아니면 출력하지 않기
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};

  // 에러 상태와 메시지 설정
  const statusCode = err.status || status.INTERNAL_SERVER_ERROR;
  const errorMessage = {
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }), // 개발 환경에서만 스택 트레이스를 포함
  };

  res.status(statusCode).json(errorMessage);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

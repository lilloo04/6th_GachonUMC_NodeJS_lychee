import express from "express";
import asyncHandler from "express-async-handler";

export const storeRouter = express.Router();

// 특정 가게의 리뷰 목록 조회
storeRouter.get(
  "/stores/:storeId/reviews",
  asyncHandler(async (req, res) => {
    const storeId = req.params.storeId;
    const page = req.query.page || 1;
    // 데이터베이스에서 리뷰 목록 조회 로직 추가
    res.status(200).json({
      status: 200,
      isSuccess: true,
      code: 2000,
      message: "리뷰 목록 조회 성공",
      data: {
        reviews: [
          // 샘플 데이터
          {
            user_name: "user123",
            rate: 4,
            review_body: "맛있어요!",
            create_date: "2024-06-18T10:15:30Z",
          },
        ],
        page: page,
      },
    });
  })
);

// 특정 가게의 미션 목록 조회
storeRouter.get(
  "/stores/:storeId/missions",
  asyncHandler(async (req, res) => {
    const storeId = req.params.storeId;
    const page = req.query.page || 1;
    // 데이터베이스에서 미션 목록 조회 로직 추가
    res.status(200).json({
      status: 200,
      isSuccess: true,
      code: 2000,
      message: "미션 목록 조회 성공",
      data: {
        missions: [
          // 샘플 데이터
          {
            mission_id: 1,
            mission_name: "미션1",
            mission_status: "진행중",
          },
        ],
        page: page,
      },
    });
  })
);

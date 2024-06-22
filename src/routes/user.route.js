import express from "express";
import asyncHandler from "express-async-handler";

export const userRouter = express.Router();

// 내가 진행중인 미션 목록 조회
userRouter.get(
  "/users/:userId/missions",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const page = req.query.page || 1;
    // 데이터베이스에서 미션 목록 조회 로직 추가
    res.status(200).json({
      status: 200,
      isSuccess: true,
      code: 2000,
      message: "진행중인 미션 목록 조회 성공",
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

// 진행중인 미션 완료 처리
userRouter.post(
  "/users/:userId/mission/:missionId/complete",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const missionId = req.params.missionId;
    // 데이터베이스에서 미션 상태 변경 로직 추가
    res.status(200).json({
      status: 200,
      isSuccess: true,
      code: 2000,
      message: "미션 완료 처리 성공",
    });
  })
);

import { getPreviewReview } from "../daos/store.dao.js";
import { previewReviewResponseDTO } from "../dtos/store.dto.js";

export const getReview = async (storeId, query) => {
  const { reviewId, size = 3 } = query;
  return previewReviewResponseDTO(
    await getPreviewReview(reviewId, size, storeId)
  );
};

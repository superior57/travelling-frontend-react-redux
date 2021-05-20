import * as actions from "./reviews.actions";
import axiosInstance from "../../../api";
import moment from "moment";

export const getReviews = (id, offset, limit, type) => async dispatch => {
  dispatch(actions.reviewsRequest());
  try {
    const result = await axiosInstance.post(`/api/reviews/${id}`, {
      offset,
      limit,
      type
    });
    dispatch(actions.reviewsSuccess(result.data));
  } catch (error) {
    dispatch(actions.reviewsSuccess({ count: 0, rows: [] }));
  }
};

export const getMoreReviews = (id, offset, limit, type) => async dispatch => {
  dispatch(actions.moreReviewsRequest());
  try {
    const result = await axiosInstance.post(`/api/reviews/${id}`, {
      offset,
      limit,
      type
    });
    dispatch(actions.moreReviewsSuccess(result.data));
  } catch (error) {
    dispatch(actions.moreReviewsFailure({ message: error.message }));
  }
};

export const addNewMediaForBuildingReview = (
  data,
  cb,
  query
) => async dispatch => {
  dispatch(actions.addNewMediaForBuildingReviewRequest());
  try {
    const result = await axiosInstance.post(
      `/api/buildings/upload-media/${query}`,
      data,
      {
        onUploadProgress: progressEvent => {
          cb(progressEvent);
        }
      }
    );
    if (result) {
      dispatch(actions.addNewMediaForBuildingReviewSuccess(result.data));
    }
  } catch (error) {
    dispatch(actions.addNewMediaForBuildingReviewFailure(error));
  }
};

export const addNewReviewForBuilding = data => async dispatch => {
  try {
    const {
      accuracy,
      check_in,
      cleanliness,
      communication,
      recommend,
      text,
      userId,
      buildingId,
      mediaLinks
    } = data;

    const result = await axiosInstance.post(`/api/buildings/user-reviews`, {
      UserId: userId,
      BuildingId: buildingId,
      date: moment(),
      recommend: recommend === 2 ? true : false, // question!!
      accuracy,
      check_in,
      cleanliness,
      communication,
      text,
      media: mediaLinks
    });

    if (result) {
      dispatch(actions.addReviewForBuildingSuccess(true));
    }
  } catch (error) {
    dispatch(actions.addReviewForBuildingFailure(false));
  }
};

export const addNewReviewForVenue = data => async dispatch => {
  try {
    const {
      userId,
      reservationId,
      isRecommend,
      cleanliness,
      text,
      communication,
      observance
    } = data;

    const result = await axiosInstance.post(`/api/review/`, {
      userId,
      reservationId,
      isRecommend,
      cleanliness,
      communication,
      observance,
      text
    });

    if (result) {
      dispatch(actions.addReviewForVenueSuccess(true));
    }
  } catch (error) {
    dispatch(actions.addReviewForVenueFailure(false));
  }
};

export const addNewReviewForUser = data => async dispatch => {
  try {
    const {
      cleanliness,
      communication,
      observance,
      recommend,
      text,
      user_id,
      host_id
    } = data;
    const result = await axiosInstance.post(`/api/buildings/host-reviews`, {
      user_id,
      host_id,
      date: moment(),
      recommend: recommend === 2 ? true : false, // question!!
      cleanliness,
      communication,
      observance,
      text
    });
    if (result) {
      dispatch(actions.addReviewForUserSuccess(true));
    }
  } catch (error) {
    dispatch(actions.addReviewForUserFailure(false));
  }
};

export const askUserReview = () => async dispatch => {
  try {
    await axiosInstance.post(`/api/buildings/ask-user-reviews`);
  } catch (error) {}
};

export const askHostReview = () => async dispatch => {
  try {
    await axiosInstance.post(`/api/buildings/ask-host-reviews`);
  } catch (error) {}
};

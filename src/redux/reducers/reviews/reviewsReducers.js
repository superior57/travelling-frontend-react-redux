import {
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAILURE,
  GET_MORE_REVIEWS_REQUEST,
  GET_MORE_REVIEWS_SUCCESS,
  GET_MORE_REVIEWS_FAILURE,
  CLEANUP_MORE_REVIEWS,
  ADD_REVIEW_FOR_VENUE_SUCCESS,
  ADD_REVIEW_FOR_VENUE_FAILURE,
  ADD_REVIEW_FOR_BUILDING_SUCCESS,
  ADD_REVIEW_FOR_BUILDING_FAILURE,
  ADD_REVIEW_FOR_USER_SUCCESS,
  ADD_REVIEW_FOR_USER_FAILURE,
  ADD_MEDIA_FOR_BUILDING_REVIEW_REQUEST,
  ADD_MEDIA_FOR_BUILDING_REVIEW_SUCCES,
  ADD_MEDIA_FOR_BUILDING_REVIEW_FAILURE
  // ADD_VIDEO_FOR_BUILDING_REVIEW_REQUEST,
  // ADD_VIDEO_FOR_BUILDING_REVIEW_SUCCES,
  // ADD_VIDEO_FOR_BUILDING_REVIEW_FAILURE
} from "../../actionReviewsTypes";
import produce from "immer";

const initialState = {
  loading: false,
  error: null,
  data: null,
  moreData: null,
  addedReviewForBuilding: false,
  addedReviewForVenue: false,
  addedReviewForUser: false,
  uploading: false,
  mediaUrl: {}
};

export default produce((draft = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_REVIEWS_REQUEST:
      draft.loading = true;
      return draft;

    case GET_REVIEWS_SUCCESS:
      if (draft.data) {
        draft.data.count = action.payload.count;
        draft.data.rows = action.payload.rows;
      } else {
        draft.data = action.payload;
      }
      return draft;

    case GET_REVIEWS_FAILURE:
      draft.loading = false;
      draft.error = payload;
      return draft;

    case GET_MORE_REVIEWS_REQUEST:
      draft.loading = true;
      return draft;

    case GET_MORE_REVIEWS_SUCCESS:
      if (draft.moreData) {
        draft.moreData.count = action.payload.count;
        draft.moreData.rows = draft.moreData.rows.concat(action.payload.rows);
      } else {
        draft.moreData = action.payload;
      }
      return draft;

    case GET_MORE_REVIEWS_FAILURE:
      draft.loading = false;
      draft.error = payload;
      return draft;

    case CLEANUP_MORE_REVIEWS:
      draft.moreData = null;
    case ADD_REVIEW_FOR_VENUE_SUCCESS:
      draft.addedReviewForVenue = action.payload;
      return draft;

    case ADD_REVIEW_FOR_VENUE_FAILURE:
      draft.addedReviewForVenue = action.payload;
      return draft;

    case ADD_REVIEW_FOR_BUILDING_SUCCESS:
      draft.addedReviewForBuilding = action.payload;
      return draft;

    case ADD_REVIEW_FOR_BUILDING_FAILURE:
      draft.addedReviewForBuilding = action.payload;
      return draft;

    case ADD_REVIEW_FOR_USER_SUCCESS:
      draft.addedReviewForUser = action.payload;
      return draft;

    case ADD_REVIEW_FOR_USER_FAILURE:
      draft.addedReviewForUser = action.payload;
      return draft;

    case ADD_MEDIA_FOR_BUILDING_REVIEW_REQUEST:
      draft.uploading = true;
      return draft;

    case ADD_MEDIA_FOR_BUILDING_REVIEW_SUCCES:
      draft.mediaUrl = action.payload;
      draft.uploading = false;
      return draft;

    case ADD_MEDIA_FOR_BUILDING_REVIEW_FAILURE:
      draft.error = action.payload;
      return draft;

    default:
      return draft;
  }
});

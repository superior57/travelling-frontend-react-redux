import { createSelector } from "reselect";

export const getReviewsFromState = state => state.reviews.data;
export const getMoreReviewsFromState = state => state.reviews.moreData;
export const getAddVenueReviewState = state =>
  state.reviews.addedReviewForVenue;
export const getAddUserReviewState = state =>
  state.reviews.addedReviewForBuilding;
export const getAddHostReviewState = state => state.reviews.addedReviewForUser;
export const getStateUpload = state => state.reviews.uploading;

export const getMediaUrl = createSelector(
  state => state.reviews.mediaUrl,
  url => {
    if (url) {
      return { link: url.Location, type: url.type };
    }
    return {};
  }
);

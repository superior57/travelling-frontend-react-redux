import { CURRENT_SEARCH_PAGE } from "./../../../constants/constants";

export const setCurrentPage = page => ({
  type: CURRENT_SEARCH_PAGE,
  payload: page
});

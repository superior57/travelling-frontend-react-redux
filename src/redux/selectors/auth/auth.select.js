import { createSelector } from 'reselect';

const getIsAuthenticated = (state) => state.auth.isAuthenticated;

export const isAuthenticated = createSelector(getIsAuthenticated, (isAuth) => isAuth);

import { createSelector } from 'reselect';
import moment from 'moment';

const COUNT_SEPARATE_PLACES = 10;

// const getPlaceDetailsSelector = (state) => state.place.placeDetails;
export const getFavoriteState = (state) => state.place.isFavorite;
export const selectSimilarPlaces = (state) => state.place.similarPlaces;

// export const selectExceptedHours = createSelector(
//   (state) => state.booking.exceptedHours.exceptions && state.booking.exceptedHours.operationHours,
//   (operationHours) => {
//       if (operationHours) {
//           return operationHours.map((hours) => {
//               const _hours = { ...hours };
//               _hours.start = moment(_hours.start).format('HH:mm');
//               _hours.end = moment(_hours.end).format('HH:mm');
//               return _hours;
//           });
//       } else  {
//           return [];
//       }
//   }
// );

export const selectOperatingHours = createSelector(
    (state) => state.place.placeDetails && state.place.placeDetails.operatingHours,
    (operatingHours) => {
        if (operatingHours) {
            return operatingHours.map((hours) => {
                const _hours = { ...hours };
                _hours.start = moment(_hours.start, 'h:mm A').format('h:mm A');
                _hours.end = moment(_hours.end, 'h:mm A').format('h:mm A');
                return _hours;
            });
        } else {
            return [];
        }
    }
);

export const getFirstRatedPlaces = createSelector(
    (state) => state.place.ratedPlaces && state.place.ratedPlaces.rows,
    (places) => {
        if (places) {
            return places.slice(0, COUNT_SEPARATE_PLACES);
        }
        return [];
    }
);

export const getSecondRatedPlaces = createSelector(
    (state) => state.place.ratedPlaces && state.place.ratedPlaces.rows,
    (places) => {
        if (places) {
            return places.slice(COUNT_SEPARATE_PLACES);
        }
        return [];
    }
);
//TODO added rows field in object
export const getLastPlacesSelect = createSelector(
    (state) => state.place.lastPlaces && state.place.lastPlaces.rows,
    (places) => {
        if (places) {
            return [...places];
        }
        return [];
    }
);
